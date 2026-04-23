import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Redeem from './pages/Redeem';
import Success from './pages/Success';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminClaims from './pages/AdminClaims';
import AdminVouchers from './pages/AdminVouchers';
import AdminRewards from './pages/AdminRewards';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/redeem" element={<><Navbar /><Redeem /><Footer /></>} />
          <Route path="/success" element={<><Navbar /><Success /><Footer /></>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/claims" element={<AdminClaims />} />
          <Route path="/admin/vouchers" element={<AdminVouchers />} />
          <Route path="/admin/rewards" element={<AdminRewards />} />

          {/* 404 Route */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">404 - Page Not Found</h1>
              <p className="text-slate-500 mb-8">The page you are looking for does not exist.</p>
              <a href="/" className="btn-primary">Return Home</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
