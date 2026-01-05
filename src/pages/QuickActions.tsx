import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Clock,
  ArrowLeftRight,
  Camera,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  CheckCircle2,
  List,
  UserCheck,
  ClipboardCheck
} from 'lucide-react';
import Card from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const actions = [
    {
      id: 'leave',
      icon: LogOut,
      title: 'Leave',
      subtitle: 'Apply Leave & View Reports',
      color: 'bg-indigo-50 text-indigo-600',
      hasDropdown: true,
      subItems: [
        { title: 'Apply Leave', path: '/apply-leave', icon: FileText },
        { title: 'My Leave Report', path: '/my-leave-report', icon: List },
        { title: 'My Available Leave', path: '/my-available-leave', icon: CheckCircle2 },
      ]
    },
    {
      id: 'permission',
      icon: Clock,
      title: 'Permission',
      subtitle: 'Apply Permission & View Reports',
      color: 'bg-purple-50 text-purple-600',
      hasDropdown: true,
      subItems: [
        { title: 'Apply Permission', path: '/apply-permission', icon: FileText },
        { title: 'My Permission Reports', path: '/my-permission-reports', icon: List },
      ]
    },
    {
      id: 'compoff',
      icon: ArrowLeftRight,
      title: 'Comp Off',
      subtitle: 'Apply Comp Off & View Reports',
      color: 'bg-blue-50 text-blue-600',
      hasDropdown: true,
      subItems: [
        { title: 'Apply Comp Off', path: '/apply-compoff', icon: FileText },
        { title: 'My Comp Off Reports', path: '/my-compoff-reports', icon: List },
        { title: 'Approved Comp Off List', path: '/approved-compoff-list', icon: ClipboardCheck },
      ]
    },
    {
      id: 'ot',
      icon: Clock,
      title: 'Overtime (OT)',
      subtitle: 'Apply OT & View Approvals',
      color: 'bg-amber-50 text-amber-600',
      hasDropdown: true,
      subItems: [
        { title: 'Apply OT', path: '/apply-ot', icon: FileText },
        { title: 'Approved OT List', path: '/approved-ot-list', icon: ClipboardCheck },
      ]
    },
    {
      id: 'punch',
      icon: Camera,
      title: 'Punch',
      subtitle: 'Punch Request & List',
      color: 'bg-teal-50 text-teal-600',
      hasDropdown: true,
      subItems: [
        { title: 'Apply Punch Request', path: '/apply-punch-request', icon: FileText },
        { title: 'My Punch Request Report', path: '/my-punch-reports', icon: List },
      ]
    },
    {
      id: 'manager-approvals',
      icon: UserCheck,
      title: 'Manager Approvals',
      subtitle: 'Approve Leave & Permission Requests',
      color: 'bg-rose-50 text-rose-600',
      hasDropdown: true,
      subItems: [
        { title: 'Approved Leave List', path: '/manager-leave-approvals', icon: CheckCircle2 },
        { title: 'Approved Permission List', path: '/manager-permission-approvals', icon: CheckCircle2 },
      ]
    },
    {
      id: 'monthly-report',
      icon: Calendar,
      title: 'Monthly Attendance Report',
      subtitle: 'Overview of Employee Attendance for the Month',
      color: 'bg-orange-50 text-orange-600',
      hasDropdown: false,
      path: '/monthly-attendance-report'
    },
    {
      id: 'employee-attendance',
      icon: Calendar,
      title: 'Employee Attendance',
      subtitle: 'Overview of daily Employee Attendance',
      color: 'bg-green-50 text-green-600',
      hasDropdown: false,
      path: '/employee-attendance-report'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4">
        <h1 className="text-2xl font-bold text-text-main">Quick Actions</h1>
        <p className="text-sm text-text-muted mt-1">Select an action to continue</p>
      </div>

      {/* Actions List */}
      <div className="px-6 py-6 space-y-3">
        {actions.map((action, idx) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {action.hasDropdown ? (
              // Expandable Item
              <div>
                <button
                  onClick={() => toggleExpand(action.id)}
                  className="w-full"
                >
                  <Card className="flex items-center space-x-4 hover:shadow-md transition-all active:scale-[0.98]">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${action.color}`}>
                      <action.icon size={28} strokeWidth={2} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-base text-text-main">{action.title}</h3>
                      <p className="text-sm text-text-muted mt-0.5">{action.subtitle}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItem === action.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} className="text-gray-400" />
                    </motion.div>
                  </Card>
                </button>

                {/* Dropdown Sub-items */}
                <AnimatePresence>
                  {expandedItem === action.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mt-2 space-y-2">
                        {action.subItems?.map((subItem, subIdx) => (
                          <button
                            key={subIdx}
                            onClick={() => navigate(subItem.path)}
                            className="w-full"
                          >
                            <Card className="flex items-center space-x-3 py-3 hover:bg-gray-50 transition-colors">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <subItem.icon size={18} className="text-gray-600" />
                              </div>
                              <span className="flex-1 text-left text-sm font-medium text-text-main">{subItem.title}</span>
                              <ChevronRight size={16} className="text-gray-400" />
                            </Card>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Direct Link Item
              <button
                onClick={() => navigate(action.path!)}
                className="w-full"
              >
                <Card className="flex items-center space-x-4 hover:shadow-md transition-all active:scale-[0.98]">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${action.color}`}>
                    <action.icon size={28} strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-base text-text-main">{action.title}</h3>
                    <p className="text-sm text-text-muted mt-0.5">{action.subtitle}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Card>
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
