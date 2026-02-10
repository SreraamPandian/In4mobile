import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MobileLayout from './components/layout/MobileLayout';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import AttendanceCalendar from './pages/AttendanceCalendar';
import ApplyLeave from './pages/ApplyLeave';
import Profile from './pages/Profile';
import Payslip from './pages/Payslip';
import ChangePassword from './pages/ChangePassword';
import Settings from './pages/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HelpSupport from './pages/HelpSupport';
import AboutApp from './pages/AboutApp';
import QuickActions from './pages/QuickActions';
import MyLeaveReport from './pages/MyLeaveReport';
import MyAvailableLeave from './pages/MyAvailableLeave';
import ApplyPermission from './pages/ApplyPermission';
import MyPermissionReports from './pages/MyPermissionReports';
import MyCompOffReports from './pages/MyCompOffReports';
import ApplyPunchRequest from './pages/ApplyPunchRequest';
import MyPunchRequestReport from './pages/MyPunchRequestReport';
import LeaveApproved from './pages/LeaveApproved';
import PermissionRequested from './pages/PermissionRequested';
import PayslipAvailable from './pages/PayslipAvailable';
import ApplyOT from './pages/ApplyOT';
import ApplyCompOff from './pages/ApplyCompOff';
import ApprovedOTList from './pages/ApprovedOTList';
import ApprovedCompOffList from './pages/ApprovedCompOffList';
import ApprovedPermissionList from './pages/ApprovedPermissionList';
import TimeLogReport from './pages/TimeLogReport';
import InvalidPunchLogs from './pages/InvalidPunchLogs';
import ManagerLeaveApprovals from './pages/ManagerLeaveApprovals';
import ManagerPermissionApprovals from './pages/ManagerPermissionApprovals';
import EmployeeAttendanceReport from './pages/EmployeeAttendanceReport';
import MonthlyAttendanceReport from './pages/MonthlyAttendanceReport';
import EmployeeList from './pages/EmployeeList';
import MapView from './pages/MapView';
import ForgotPassword from './pages/ForgotPassword';

// Placeholder for Reports
const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Reports</h1>
    <p className="text-gray-500">Coming soon...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/map-view" element={<MapView />} />

          <Route element={<MobileLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance-calendar" element={<AttendanceCalendar />} />
            <Route path="/employee-attendance-report" element={<EmployeeAttendanceReport />} />
            <Route path="/monthly-attendance-report" element={<MonthlyAttendanceReport />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/apply-leave" element={<ApplyLeave />} />
            <Route path="/quick-actions" element={<QuickActions />} />
            <Route path="/my-leave-report" element={<MyLeaveReport />} />
            <Route path="/my-available-leave" element={<MyAvailableLeave />} />
            <Route path="/apply-permission" element={<ApplyPermission />} />
            <Route path="/my-permission-reports" element={<MyPermissionReports />} />
            <Route path="/my-compoff-reports" element={<MyCompOffReports />} />
            <Route path="/apply-compoff" element={<ApplyCompOff />} />
            <Route path="/approved-compoff-list" element={<ApprovedCompOffList />} />
            <Route path="/approved-permission-list" element={<ApprovedPermissionList />} />
            <Route path="/apply-ot" element={<ApplyOT />} />
            <Route path="/approved-ot-list" element={<ApprovedOTList />} />
            <Route path="/time-log-report" element={<TimeLogReport />} />
            <Route path="/invalid-punch-logs" element={<InvalidPunchLogs />} />
            <Route path="/apply-punch-request" element={<ApplyPunchRequest />} />
            <Route path="/my-punch-reports" element={<MyPunchRequestReport />} />
            <Route path="/manager-leave-approvals" element={<ManagerLeaveApprovals />} />
            <Route path="/manager-permission-approvals" element={<ManagerPermissionApprovals />} />
            <Route path="/payslip" element={<Payslip />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/about-app" element={<AboutApp />} />
            <Route path="/leave-approved" element={<LeaveApproved />} />
            <Route path="/permission-requested" element={<PermissionRequested />} />
            <Route path="/payslip-available" element={<PayslipAvailable />} />
          </Route>

          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
