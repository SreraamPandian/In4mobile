import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Calendar, ChevronDown } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Payslip = () =>{
  const [selectedMonth, setSelectedMonth] = useState('December 2025');
  
  const months = [
    'December 2025',
    'November 2025',
    'October 2025',
    'September 2025',
    'August 2025',
  ];

  const payslipData = {
    netSalary: '₹ 45,000',
    month: 'December 2025',
    paidOn: 'January 1, 2026',
    earnings: [
      { label: 'Basic Salary', amount: '₹ 30,000' },
      { label: 'HRA', amount: '₹ 10,000' },
      { label: 'Allowances', amount: '₹ 5,000' },
    ],
    deductions: [
      { label: 'PF Contribution', amount: '₹ 2,000' },
      { label: 'Tax (TDS)', amount: '₹ 3,000' },
    ],
    totalEarnings: '₹ 45,000',
    totalDeductions: '₹ 5,000',
  };

  return (
    <div className="pb-24 px-6 pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-text-main mb-2">Payslip</h1>
        <p className="text-text-secondary text-sm">View and download your salary details</p>
      </motion.div>

      {/* Month Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full h-14 pl-12 pr-10 bg-surface rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main appearance-none"
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            <Calendar size={20} />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
            <ChevronDown size={20} />
          </div>
        </div>
      </motion.div>

      {/* Net Salary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-primary to-primary-dark text-white mb-6">
          <div className="text-center py-4">
            <p className="text-primary-light text-sm font-medium mb-2">Net Salary</p>
            <h2 className="text-4xl font-bold mb-2">{payslipData.netSalary}</h2>
            <p className="text-primary-light text-sm">{payslipData.month}</p>
            <p className="text-primary-light/80 text-xs mt-1">Paid on {payslipData.paidOn}</p>
          </div>
        </Card>
      </motion.div>

      {/* Earnings Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="mb-4">
          <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Earnings</h3>
          <div className="space-y-3">
            {payslipData.earnings.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <span className="text-sm font-semibold text-text-main">{item.amount}</span>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-border flex justify-between items-center">
              <span className="text-sm font-bold text-text-main">Total Earnings</span>
              <span className="text-base font-bold text-success">{payslipData.totalEarnings}</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Deductions Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mb-6">
          <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Deductions</h3>
          <div className="space-y-3">
            {payslipData.deductions.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <span className="text-sm font-semibold text-text-main">{item.amount}</span>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-border flex justify-between items-center">
              <span className="text-sm font-bold text-text-main">Total Deductions</span>
              <span className="text-base font-bold text-error">{payslipData.totalDeductions}</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <Button fullWidth size="lg" className="shadow-lg shadow-primary/30">
          <Download size={18} className="mr-2" />
          Download PDF
        </Button>
        <button className="w-full h-12 rounded-xl border-2 border-border bg-surface text-text-main font-medium hover:bg-background transition-colors flex items-center justify-center space-x-2">
          <Mail size={18} />
          <span>Email to Me</span>
        </button>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Previous Months</h3>
        <div className="space-y-2">
          {months.slice(1).map((month, idx) => (
            <button
              key={idx}
              className="w-full p-4 bg-surface rounded-xl border border-border hover:bg-background transition-colors text-left"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-main">{month}</span>
                <Download size={16} className="text-text-muted" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Payslip;
