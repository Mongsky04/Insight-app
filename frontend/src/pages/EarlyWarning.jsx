import { Settings, CheckCircle } from 'lucide-react'

const EarlyWarning = () => {
  const highRiskCustomers = [
    {
      id: 1,
      name: 'Budi Santoso',
      email: 'budi@example.com',
      segment: "Can't Lose Them",
      segmentColor: 'bg-red-100 text-red-700',
      probability: 92,
      lastActive: '45 days ago',
      status: 'Queued',
    },
    {
      id: 2,
      name: 'Siti Aminah',
      email: 'siti@example.com',
      segment: 'At Risk',
      segmentColor: 'bg-orange-100 text-orange-700',
      probability: 78,
      lastActive: '32 days ago',
      status: 'Queued',
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john@example.com',
      segment: 'About to Sleep',
      segmentColor: 'bg-yellow-100 text-yellow-700',
      probability: 65,
      lastActive: '28 days ago',
      status: 'Queued',
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      email: 'dewi@example.com',
      segment: "Can't Lose Them",
      segmentColor: 'bg-red-100 text-red-700',
      probability: 88,
      lastActive: '50 days ago',
      status: 'Queued',
    },
    {
      id: 5,
      name: 'Ahmad Fikri',
      email: 'ahmad@example.com',
      segment: 'At Risk',
      segmentColor: 'bg-orange-100 text-orange-700',
      probability: 75,
      lastActive: '35 days ago',
      status: 'Queued',
    },
  ]

  const getProgressColor = (probability) => {
    if (probability >= 80) return 'bg-red-500'
    if (probability >= 60) return 'bg-orange-500'
    return 'bg-yellow-500'
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Churn Early Warning System</h1>
        <p className="text-gray-500 mt-1">Monitor and prevent customer churn automatically.</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3">Early Warning System</h2>
            <p className="text-white/90 mb-2">
              Monitoring segmen{' '}
              <span className="bg-white/20 px-2.5 py-1 rounded-md font-medium">About to Sleep</span>
              {', '}
              <span className="bg-white/20 px-2.5 py-1 rounded-md font-medium">At Risk</span>
              {', dan '}
              <span className="bg-white/20 px-2.5 py-1 rounded-md font-medium">Can't Lose Them</span>
              {' '}secara real-time.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 ml-6 min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Automated Email Intervention</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            <p className="text-xs text-white/80">System is sending emails automatically based on risk score</p>
          </div>
        </div>
      </div>

      {/* High Risk Customers Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">High Risk Customers</h2>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium">
            <Settings className="w-4 h-4" />
            Configure Thresholds
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Risk Segment
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Risk Probability
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  AI Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {highRiskCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${customer.segmentColor}`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[200px]">
                        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(customer.probability)} transition-all duration-500`}
                            style={{ width: `${customer.probability}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 min-w-[3rem] text-right">
                        {customer.probability}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{customer.lastActive}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{customer.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EarlyWarning
