
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Optimizer from './components/pages/Optimizer';
import AuthForm from './components/authPages/authForm/AuthForm';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

function App() {
  return (
    <Routes>
        {/* Routes with Topbar and Footer */}
        <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        <Route path="/optimizer" element={
          <MainLayout>
            <ProtectedRoute>
              <Optimizer />
            </ProtectedRoute>
          </MainLayout>
        } />
        
        {/* Auth route without Topbar and Footer */}
        <Route path="/auth" element={
          <AuthLayout>
            <AuthForm />
          </AuthLayout>
        } />
      </Routes>
  );
}

export default App;
