import { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

const DeepSegmentation = () => {
  const [activeTab, setActiveTab] = useState('lifecycle')
  const [selectedSegment, setSelectedSegment] = useState(null)

  const tabs = [
    { id: 'lifecycle', label: 'Lifecycle' },
    { id: 'value', label: 'Value' },
    { id: 'behavior', label: 'Behavior' },
    { id: 'transaction', label: 'Transaction' },
  ]

  // Lifecycle segments
  const lifeCycleSegments = [
    {
      id: 'champions',
      name: 'Champions',
      count: 120,
      color: 'bg-green-500',
      dotColor: 'bg-green-500',
      description: 'Tap to see customer list & AI Insights',
    },
    {
      id: 'loyal',
      name: 'Loyal Customers',
      count: 340,
      color: 'bg-blue-500',
      dotColor: 'bg-blue-500',
      description: 'Tap to see customer list & AI Insights',
    },
    {
      id: 'potential',
      name: 'Potential Loyalist',
      count: 210,
      color: 'bg-purple-500',
      dotColor: 'bg-purple-500',
      description: 'Tap to see customer list & AI Insights',
    },
    {
      id: 'atrisk',
      name: 'At Risk',
      count: 85,
      color: 'bg-orange-500',
      dotColor: 'bg-orange-500',
      description: 'Tap to see customer list & AI Insights',
    },
    {
      id: 'cantlose',
      name: "Can't Lose Them",
      count: 45,
      color: 'bg-red-500',
      dotColor: 'bg-red-500',
      description: 'Tap to see customer list & AI Insights',
    },
  ]

  const getCurrentSegments = () => {
    return lifeCycleSegments
  }

  const segments = getCurrentSegments()

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Segmentation Deep Dive</h1>
        <p className="text-gray-500 mt-1">Analyze customer groups with AI-driven insights.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              setSelectedSegment(null)
            }}
            className={`px-6 py-2.5 font-medium text-sm rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side - Segment List */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Customer Life Cycle Breakdown
          </h2>

          <div className="space-y-3">
            {segments.map((segment) => (
              <button
                key={segment.id}
                onClick={() => setSelectedSegment(segment)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md text-left ${
                  selectedSegment?.id === segment.id
                    ? 'border-primary-500 bg-blue-50'
                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${segment.dotColor} flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900">{segment.name}</div>
                  <div className="text-sm text-gray-500 truncate">{segment.description}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-semibold text-gray-900">{segment.count}</div>
                  <div className="text-sm text-gray-500">Users</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - AI Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Per-Segment AI Insights
          </h2>

          {!selectedSegment ? (
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-center max-w-md leading-relaxed">
                Select a specific segment from the list on the left (e.g., "Champions") to generate a detailed Persona and Strategy specifically for that group.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Segment Header */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className={`w-12 h-12 rounded-full ${selectedSegment.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {selectedSegment.count}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedSegment.name}</h3>
                  <p className="text-sm text-gray-600">{selectedSegment.count} customers in this segment</p>
                </div>
              </div>

              {/* AI Insights Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">📊 Segment Characteristics</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    {selectedSegment.id === 'champions' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Purchase Frequency:</span>
                          <span className="font-medium">8.5x per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Order Value:</span>
                          <span className="font-medium">Rp 2.8M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Purchase:</span>
                          <span className="font-medium">15 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Retention Rate:</span>
                          <span className="font-medium">95%</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'loyal' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Purchase Frequency:</span>
                          <span className="font-medium">5.2x per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Order Value:</span>
                          <span className="font-medium">Rp 1.8M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Purchase:</span>
                          <span className="font-medium">28 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Retention Rate:</span>
                          <span className="font-medium">82%</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'potential' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Purchase Frequency:</span>
                          <span className="font-medium">3.8x per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Order Value:</span>
                          <span className="font-medium">Rp 1.5M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Purchase:</span>
                          <span className="font-medium">45 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Growth Potential:</span>
                          <span className="font-medium">High</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'atrisk' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Purchase Frequency:</span>
                          <span className="font-medium">2.1x per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Order Value:</span>
                          <span className="font-medium">Rp 1.2M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Purchase:</span>
                          <span className="font-medium">90 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Churn Risk:</span>
                          <span className="font-medium text-orange-600">Medium</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'cantlose' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Purchase Frequency:</span>
                          <span className="font-medium">1.2x per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Order Value:</span>
                          <span className="font-medium">Rp 3.2M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Purchase:</span>
                          <span className="font-medium">180 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Churn Risk:</span>
                          <span className="font-medium text-red-600">High</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">🎯 Recommended Actions</h4>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 space-y-2 text-sm">
                    {selectedSegment.id === 'champions' && (
                      <>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">VIP loyalty program with exclusive perks</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Early access to new products and sales</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Personalized recommendations based on purchase history</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'loyal' && (
                      <>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Upsell premium products and bundles</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Invite to join Champions tier program</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Send thank you messages and rewards</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'potential' && (
                      <>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Targeted campaigns to increase engagement</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Product education and feature highlights</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Limited-time offers to boost purchase frequency</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'atrisk' && (
                      <>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Re-engagement campaign with special discount</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Survey to understand pain points</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Personalized win-back offers</span>
                        </div>
                      </>
                    )}
                    {selectedSegment.id === 'cantlose' && (
                      <>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Urgent win-back campaign with high-value offer</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">Personal outreach from account manager</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span className="text-gray-700">VIP treatment and exclusive benefits</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  View Full Customer List <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DeepSegmentation
