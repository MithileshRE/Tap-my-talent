import './App.css'
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Lazy load all page components
const Home = lazy(() => import('./components/landingPages/home/Home.tsx'))
const Services = lazy(() => import('./components/landingPages/services/Services.tsx'))
const Pricing = lazy(() => import('./components/landingPages/pricing/Pricing.tsx'))
const Bootcamp = lazy(() => import('./components/landingPages/bootcamp/Bootcamp.tsx'))
const Contact = lazy(() => import('./components/landingPages/contact/Contact.tsx'))
const NotFound = lazy(() => import('./components/landingPages/common/NotFound/NotFound.tsx'))
const ComingSoon = lazy(() => import('./components/landingPages/common/ComingSoon/ComingSoon.tsx'))

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);
  
  return null;
}


function App() {
  return (
    <Router>
      <div className="app-container">
        <ScrollToTop />
        <Suspense fallback={<div className="loading-container">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/bootcamp" element={<Bootcamp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-in" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
