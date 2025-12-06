# 🚀 CustPulse AI Dashboard

Modern customer segmentation dashboard built with **Vite + React + Tailwind CSS + JavaScript**.

![Dashboard Preview](screenshot.png)

## ✨ Features

- 📊 **Executive Dashboard** - KPI cards and customer analytics
- 🎯 **Deep Segmentation** - Customer lifecycle and behavior analysis
- ⚠️ **Early Warning System** - Churn risk monitoring
- 📧 **Email Automation CMS** - Template management
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 🚀 **Fast Performance** - Built with Vite
- 📱 **Responsive** - Works on all devices

## 🖥️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM 6
- **Icons:** Lucide React
- **Language:** JavaScript (ES6+)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (https://nodejs.org/)
- npm or yarn

### Installation

```bash
# 1. Extract project
cd custpulse-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Dashboard will open at: **http://localhost:3000**

## 📁 Project Structure

```
custpulse-dashboard/
├── src/
│   ├── components/
│   │   └── Layout.jsx           # Main layout with sidebar
│   ├── pages/
│   │   ├── DashboardOverview.jsx   # Executive dashboard
│   │   ├── DeepSegmentation.jsx    # Segmentation page
│   │   ├── EarlyWarning.jsx        # Churn warning
│   │   └── EmailAutomation.jsx     # Email CMS
│   ├── App.jsx                  # App router
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Dashboard Pages

### 1. Executive Dashboard (/)
- **Total Customers** - 12,450 customers (+12%)
- **Avg. Customer Value** - Rp 1.2M (+5.4%)
- **Churn Risk** - 8.2% (-1.2%)
- **Campaign Conv.** - 24.5% (+2.1%)

**Charts:**
- Customer Life Cycle (Champions, Loyal, Potential)
- Customer Value Tier (Platinum, Gold, Silver)
- Customer Behavior (Night Owls, Weekend Warriors, Window Shoppers)
- Transaction Patterns (Big Spenders, Frequent Buys, Seasonal)

### 2. Deep Segmentation (/segmentation)
Customer segmentation analysis with AI insights.

### 3. Early Warning System (/early-warning)
Churn risk monitoring and automated alerts.

### 4. Email Automation CMS (/email-automation)
Email template management and automation.

## 🎨 Color Palette

```css
Primary Blue:    #3b82f6
Sidebar Dark:    #0f172a
Sidebar Light:   #1e293b

Chart Colors:
- Green:   #10b981, #16a34a
- Blue:    #3b82f6, #2563eb
- Purple:  #8b5cf6, #7c3aed
- Yellow:  #eab308
- Gray:    #9ca3af
- Red:     #ef4444
- Pink:    #ec4899
- Indigo:  #4f46e5
- Emerald: #10b981
- Cyan:    #06b6d4
```

## 🔧 Customization

### Change KPI Values
Edit `src/pages/DashboardOverview.jsx`:
```javascript
const kpiCards = [
  {
    title: 'Total Customers',
    value: '12,450',  // ← Change this
    change: '+12% from last month',
  },
  // ...
]
```

### Change Chart Data
Edit the data arrays in `DashboardOverview.jsx`:
```javascript
const lifeCycleData = [
  { label: 'Champions', users: 120, color: 'bg-green-500', width: 24 },
  // ...
]
```

### Modify Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#3b82f6',  // ← Change primary color
  }
}
```

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

Output directory: `dist/`

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify
1. Push to GitHub
2. New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Change port in vite.config.js
server: {
  port: 3001,  // ← Change port
  open: true
}
```

### Dependencies error
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind not working
```bash
# Restart dev server
npm run dev
```

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔮 Future Enhancements

- [ ] Connect to Supabase backend
- [ ] Add real-time data updates
- [ ] Implement data export (CSV/Excel)
- [ ] Add date range filters
- [ ] Create PDF reports
- [ ] Add more charts with Recharts
- [ ] Implement search functionality
- [ ] Add user authentication
- [ ] Dark mode toggle
- [ ] Mobile app version

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Author

Created for customer segmentation analysis

---

**Need help?** Open an issue or contact the developer!

🚀 Happy analyzing!
