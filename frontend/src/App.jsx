import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardOverview from './pages/DashboardOverview'
import DeepSegmentation from './pages/DeepSegmentation'
import EarlyWarning from './pages/EarlyWarning'
import EmailAutomation from './pages/EmailAutomation'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/segmentation" element={<DeepSegmentation />} />
          <Route path="/early-warning" element={<EarlyWarning />} />
          <Route path="/email-automation" element={<EmailAutomation />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
