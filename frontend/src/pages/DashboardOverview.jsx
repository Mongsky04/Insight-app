import { Users, Wallet, Activity, TrendingUp } from 'lucide-react'

const DashboardOverview = () => {
  // KPI Cards Data
  const kpiCards = [
    {
      title: 'Total Customers',
      value: '12,450',
      change: '+12% from last month',
      positive: true,
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Avg. Customer Value',
      value: 'Rp 1.2M',
      change: '+5.4% from last month',
      positive: true,
      icon: Wallet,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Churn Risk',
      value: '8.2%',
      change: '-1.2% from last month',
      positive: true,
      icon: Activity,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: 'Campaign Conv.',
      value: '24.5%',
      change: '+2.1% from last month',
      positive: true,
      icon: TrendingUp,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ]

  // Customer Life Cycle Data
  const lifeCycleData = [
    { label: 'Champions', users: 120, color: 'bg-green-500', width: 24 },
    { label: 'Loyal Customers', users: 340, color: 'bg-blue-500', width: 68 },
    { label: 'Potential Loyalist', users: 210, color: 'bg-purple-500', width: 42 },
  ]

  // Customer Value Tier Data
  const valueTierData = [
    { label: 'Platinum (Top 1%)', users: 50, color: 'bg-purple-600', width: 100 },
    { label: 'Gold (Top 5%)', users: 150, color: 'bg-yellow-500', width: 100 },
    { label: 'Silver (Top 20%)', users: 400, color: 'bg-gray-400', width: 100 },
  ]

  // Customer Behavior Data
  const behaviorData = [
    { label: 'Night Owls', users: 300, color: 'bg-indigo-600', width: 50 },
    { label: 'Weekend Warriors', users: 500, color: 'bg-green-600', width: 83 },
    { label: 'Window Shoppers', users: 600, color: 'bg-pink-600', width: 100 },
  ]

  // Transaction Patterns Data
  const transactionData = [
    { label: 'Big Spenders', users: 100, color: 'bg-emerald-500', width: 13 },
    { label: 'Frequent Small Buys', users: 750, color: 'bg-blue-600', width: 100 },
    { label: 'Seasonal Buyers', users: 200, color: 'bg-cyan-500', width: 27 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, here is your CRM overview for today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="kpi-card">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm text-gray-600">{card.title}</span>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{card.value}</div>
              <div className={`text-sm ${card.positive ? 'text-green-600' : 'text-red-600'}`}>
                {card.change}
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Customer Life Cycle */}
        <div className="chart-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Customer Life Cycle</h2>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
              Detail
            </button>
          </div>
          <div className="space-y-5">
            {lifeCycleData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.users} Users</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`progress-bar ${item.color}`}
                    style={{ width: `${item.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Value Tier */}
        <div className="chart-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Customer Value Tier</h2>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
              Detail
            </button>
          </div>
          <div className="space-y-5">
            {valueTierData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.users} Users</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`progress-bar ${item.color}`}
                    style={{ width: `${item.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Behavior */}
        <div className="chart-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Customer Behavior</h2>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
              Detail
            </button>
          </div>
          <div className="space-y-5">
            {behaviorData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.users} Users</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`progress-bar ${item.color}`}
                    style={{ width: `${item.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Patterns */}
        <div className="chart-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Transaction Patterns</h2>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
              Detail
            </button>
          </div>
          <div className="space-y-5">
            {transactionData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.users} Users</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`progress-bar ${item.color}`}
                    style={{ width: `${item.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
