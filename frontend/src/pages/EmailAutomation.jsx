import { useState } from 'react'
import { Plus, Settings, Eye, Send, Save, Sparkles } from 'lucide-react'

const EmailAutomation = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('winback')
  const [targetSegment, setTargetSegment] = useState("Can't Lose Them")
  const [emailSubject, setEmailSubject] = useState('We miss you! Special offer inside')
  const [emailContent, setEmailContent] = useState(`Hi {Customer_Name},

We noticed it's been a while since your last visit. As one of our most valued customers, we hate to see you go.

Here is a special voucher just for you: WINBACK20 for 20% off your next transaction.

Best,
The Team`)

  const templates = [
    {
      id: 'winback',
      name: 'Win-back High Value',
      target: "Can't Lose Them",
    },
    {
      id: 'nudge',
      name: "Nudge 'About to Sleep'",
      target: 'About to Sleep',
    },
  ]

  const segments = [
    "Can't Lose Them",
    'At Risk',
    'About to Sleep',
    'Champions',
    'Loyal Customers',
    'Potential Loyalist',
  ]

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template.id)
    if (template.id === 'winback') {
      setTargetSegment("Can't Lose Them")
      setEmailSubject('We miss you! Special offer inside')
      setEmailContent(`Hi {Customer_Name},

We noticed it's been a while since your last visit. As one of our most valued customers, we hate to see you go.

Here is a special voucher just for you: WINBACK20 for 20% off your next transaction.

Best,
The Team`)
    } else if (template.id === 'nudge') {
      setTargetSegment('About to Sleep')
      setEmailSubject('Hey! We have something special for you')
      setEmailContent(`Hi {Customer_Name},

We noticed you haven't visited us in a while. We'd love to have you back!

Here's a special 15% discount code just for you: COMEBACK15

Looking forward to seeing you soon!

Best regards,
The Team`)
    }
  }

  const getTemplateTitle = () => {
    const template = templates.find(t => t.id === selectedTemplate)
    return template ? template.name : 'New Template'
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Automation CMS</h1>
        <p className="text-gray-500 mt-1">Manage and customize your automated communication.</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Side - Templates List */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Templates</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-primary-500 bg-blue-50'
                    : 'border-transparent bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-gray-900 mb-1">{template.name}</div>
                <div className="text-sm text-gray-500">Target: {template.target}</div>
              </button>
            ))}

            <button className="w-full flex items-center justify-center gap-2 p-4 text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium">
              <Plus className="w-5 h-5" />
              Create New Template
            </button>
          </div>
        </div>

        {/* Right Side - Email Editor */}
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Edit Template</h2>
              <p className="text-sm text-gray-500">Editing: {getTemplateTitle()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all font-medium">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all font-medium">
                <Send className="w-4 h-4" />
                Test
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-all font-medium">
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Target Segment */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Target Segment
              </label>
              <select
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
              >
                {segments.map((segment) => (
                  <option key={segment} value={segment}>
                    {segment}
                  </option>
                ))}
              </select>
            </div>

            {/* Email Subject */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                placeholder="Enter email subject"
              />
            </div>

            {/* Email Content */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Content (AI Assisted)
              </label>
              <div className="relative">
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 font-mono text-sm resize-none"
                  placeholder="Enter email content..."
                />
                <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  Improve with AI
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Available variables: {'{Customer_Name}'}, {'{Last_Purchase}'}, {'{Favorite_Product}'}, {'{Discount_Code}'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailAutomation
