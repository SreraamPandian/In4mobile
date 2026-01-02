import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import ApplyLeave from './pages/ApplyLeave';
import Profile from './pages/Profile';
import Payslip from './pages/Payslip';

// Placeholder for Reports
const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Reports</h1>
    <p className="text-gray-500">Coming soon...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
          <Route path="/payslip" element={<Payslip />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
