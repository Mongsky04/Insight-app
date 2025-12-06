# rfm_pipeline.py

import os
import math
import numpy as np
import pandas as pd

from sqlalchemy import create_engine, text
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

# ============================================================
# 1. CONNECT TO SUPABASE (POOLER)
# ============================================================
def build_engine():
    db_url = os.getenv("SUPABASE_DB_URL")
    if not db_url:
        raise RuntimeError("SUPABASE_DB_URL tidak ditemukan di .env")

    # Convert to SQLAlchemy format
    if db_url.startswith("postgresql://") and "+psycopg2" not in db_url:
        db_url = db_url.replace("postgresql://", "postgresql+psycopg2://", 1)

    print("🔗 Connect to Supabase via Pooler")
    print(f"URL = {db_url}")

    return create_engine(db_url)


engine = build_engine()


# ============================================================
# 2. Load base dataframe
# ============================================================
def load_base_dataframe() -> pd.DataFrame:
    query = """
    SELECT
        t.transaction_id,
        t.customer_id,
        t.transaction_date,
        t.total_amount,
        t.payment_method,
        t.shipping_method,
        t.delivery_time,
        t.coupon_code,
        t.city AS transaction_city,

        td.quantity,
        td.unit_price,
        td.discount AS item_discount,
        td.total,

        p.product_id,
        p.product_name,
        p.category,
        p.brand,
        p.price,
        p.storage,
        p.color,
        p.release_year,
        p.years_since_release,
        p.sales_factor,

        c.age,
        c.city AS customer_city
    FROM transactions t
    JOIN transaction_details td ON td.transaction_id = t.transaction_id
    JOIN products p ON p.product_id = td.product_id
    JOIN customers c ON c.customer_id = t.customer_id;
    """

    df = pd.read_sql(query, engine)
    return df


# ============================================================
# 3. Preprocessing
# ============================================================
def preprocess(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # Hapus duplikat
    df = df.drop_duplicates()

    # Pastikan transaction_date datetime
    df["transaction_date"] = pd.to_datetime(df["transaction_date"], errors="coerce")

    # Kolom kategorikal
    categorical_cols = [
        "product_name",
        "category",
        "brand",
        "storage",
        "color",
        "payment_method",
        "shipping_method",
        "delivery_time",
        "coupon_code",
        "transaction_city",
    ]
    for col in categorical_cols:
        if col in df.columns:
            df[col] = df[col].astype("category")

    # Kolom numerik
    numeric_cols = [
        "quantity",
        "unit_price",
        "item_discount",
        "total",
        "price",
        "release_year",
        "sales_factor",
        "age",
    ]
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    # Buang baris yang tidak valid
    df = df[df["transaction_date"].notna()]
    df = df[df["total"] > 0]

    return df


# ============================================================
# 4. Hitung RFM
# ============================================================
def compute_rfm(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    snapshot_date = df["transaction_date"].max() + pd.Timedelta(days=1)
    print("Snapshot date:", snapshot_date.date())

    last_purchase = df.groupby("customer_id")["transaction_date"].max()
    last_purchase = pd.to_datetime(last_purchase, errors="coerce")

    recency = (snapshot_date - last_purchase).dt.days.rename("recency")
    frequency = (
        df.groupby("customer_id")["transaction_date"].nunique().rename("frequency")
    )
    monetary = df.groupby("customer_id")["total"].sum().rename("monetary")

    rfm = pd.concat(
        [last_purchase.rename("last_purchase"), recency, frequency, monetary], axis=1
    )

    print("Jumlah pelanggan unik:", len(rfm))
    return rfm


# ============================================================
# 5. K-Means & Labeling
# ============================================================
def label_cluster(cluster_id: int) -> str:
    return {
        1: "Sleeping Regulars",
        2: "Rising Stars",
        3: "Price-Sensitive One-Timers",
        4: "Premium Loyalist",
    }.get(cluster_id, "Unknown")


def run_kmeans(rfm: pd.DataFrame, n_clusters: int = 4) -> pd.DataFrame:
    rfm = rfm.copy()

    X = rfm[["recency", "frequency", "monetary"]]
    X_log = np.log1p(X)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_log)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    labels = kmeans.fit_predict(X_scaled)

    rfm["cluster_id"] = labels + 1
    rfm["segment_name"] = rfm["cluster_id"].apply(label_cluster)

    score = silhouette_score(X_scaled, labels)
    print(f"Silhouette Score: {score:.4f}")

    return rfm


# ============================================================
# 6. Save results (FAST & SAFE, with progress log)
# ============================================================
def save_results_to_db(rfm: pd.DataFrame):
    """
    rfm index = customer_id
    kolom: last_purchase, recency, frequency, monetary, cluster_id, segment_name
    """
    rfm_out = rfm.reset_index()  # index 'customer_id' jadi kolom 'customer_id'
    chunk_size = 2000  # jumlah row per batch

    with engine.begin() as conn:
        # 1) Bersihkan isi rfm_features dulu
        print("DELETE FROM rfm_features...")
        conn.execute(text("DELETE FROM rfm_features;"))

        # 2) BULK INSERT ke rfm_features (pakai chunk biar aman dari timeout)
        print("Insert ke rfm_features (bulk chunk)...")
        insert_rfm_sql = text(
            """
            INSERT INTO rfm_features
                (customer_id, recency, frequency, monetary, last_purchase_date, segment_name)
            VALUES
                (:customer_id, :recency, :frequency, :monetary, :last_purchase_date, :segment_name)
            """
        )

        rfm_records = [
            {
                "customer_id": str(row["customer_id"]),
                "recency": int(row["recency"]),
                "frequency": int(row["frequency"]),
                "monetary": float(row["monetary"]),
                "last_purchase_date": row["last_purchase"],
                "segment_name": row["segment_name"],
            }
            for _, row in rfm_out.iterrows()
        ]

        total = len(rfm_records)
        num_batches = math.ceil(total / chunk_size)

        for i in range(0, total, chunk_size):
            batch = rfm_records[i : i + chunk_size]
            conn.execute(insert_rfm_sql, batch)
            print(f"   → batch {i // chunk_size + 1}/{num_batches} inserted")

        print(f"rfm_features inserted: {total} rows")

        # 3) Upsert 4 segmen ke tabel segments
        print("Upsert ke segments...")
        segments = [
            ("premium-loyalist", "Premium Loyalist"),
            ("rising-stars", "Rising Stars"),
            ("sleeping-regulars", "Sleeping Regulars"),
            ("price-sensitive-one-timers", "Price-Sensitive One-Timers"),
        ]

        insert_segment_sql = text(
            """
            INSERT INTO segments (segment_id, segment_name, description)
            VALUES (:segment_id, :segment_name, :description)
            ON CONFLICT (segment_id) DO UPDATE
            SET segment_name = EXCLUDED.segment_name,
                description = EXCLUDED.description;
            """
        )

        seg_records = [
            {
                "segment_id": seg_id,
                "segment_name": seg_name,
                "description": seg_name,
            }
            for seg_id, seg_name in segments
        ]
        conn.execute(insert_segment_sql, seg_records)
        print("segments upserted")

    print("RFM features & segments berhasil disimpan ke database.")


# ============================================================
# 7. MAIN
# ============================================================
def main():
    print("Load data dari database...")
    df = load_base_dataframe()
    print(f"Total baris raw: {len(df)}")

    print("Preprocessing...")
    df = preprocess(df)
    print(f"Total baris setelah cleaning: {len(df)}")

    print("Hitung RFM...")
    rfm = compute_rfm(df)

    print("Run K-Means...")
    rfm = run_kmeans(rfm)

    print("Saving results...")
    save_results_to_db(rfm)

    print("Pipeline selesai tanpa error!")


if __name__ == "__main__":
    main()
