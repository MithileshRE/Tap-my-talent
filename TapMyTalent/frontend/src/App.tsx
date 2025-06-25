import './App.css'
import AuthForm from './components/authPages/authForm/AuthForm.tsx'
import OrganizationAuthForm from './components/authPages/organizationAuth/OrganizationAuthForm.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import StudentDashboard from './components/dashboard/studentDashboard/StudentDashboard.tsx'
import Home from './components/landingPages/home/Home.tsx'
import Services from './components/landingPages/services/Services.tsx'
import Pricing from './components/landingPages/pricing/Pricing.tsx'
import Bootcamp from './components/landingPages/bootcamp/Bootcamp.tsx'
import Contact from './components/landingPages/contact/Contact.tsx'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/bootcamp" element={<Bootcamp />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/" element={<Navigate to="/auth" replace />} /> */}
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/org-auth" element={<OrganizationAuthForm />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard/*" element={<StudentDashboard />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
          <Route path="/dashboard/home" element={<StudentDashboard />} />
          <Route path="/dashboard/jobs" element={<StudentDashboard />} />
          <Route path="/dashboard/services" element={<StudentDashboard />} />
          <Route path="/dashboard/network" element={<StudentDashboard />} />
          <Route path="/dashboard/messages" element={<StudentDashboard />} />
          <Route path="/dashboard/settings" element={<StudentDashboard />} />
          
          {/* Redirect old routes to new dashboard routes */}
          <Route path="/jobs" element={<Navigate to="/dashboard/jobs" replace />} />
          <Route path="/services" element={<Navigate to="/dashboard/services" replace />} />
          <Route path="/network" element={<Navigate to="/dashboard/network" replace />} />
          <Route path="/messages" element={<Navigate to="/dashboard/messages" replace />} />
          <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
