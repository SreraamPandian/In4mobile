import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Calendar, ChevronDown } from 'lucide-react';
import { format, subMonths } from 'date-fns';
import Card from '../components/ui/Card';

const CustomSelect = ({ value, onChange, options, icon: Icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-xl border border-border p-3 pl-10 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <span className="font-semibold text-text-main text-sm truncate">{value}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-gray-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto scrollbar-hide"
          >
            {options.map((opt: string) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${value === opt
                    ? 'bg-primary text-white'
                    : 'text-text-main hover:bg-primary/10'
                  }`}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Payslip = () => {
  const now = new Date();
  const prevMonthDate = subMonths(now, 1);

  const [selectedMonth, setSelectedMonth] = useState(format(prevMonthDate, 'MMMM'));
  const [selectedYear, setSelectedYear] = useState(format(prevMonthDate, 'yyyy'));

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = ['2026', '2025', '2024'];

  const earnings = [
    { label: 'Basic Salary', amount: '₹ 30,000' },
    { label: 'HRA', amount: '₹ 10,000' },
    { label: 'Allowances', amount: '₹ 5,000' },
  ];

  const deductions = [
    { label: 'PF Contribution', amount: '₹ 2,000' },
    { label: 'Tax (TDS)', amount: '₹ 3,000' },
  ];

  const handleDownload = () => {
    // Mock download functionality
    console.log("Downloading PDF for", selectedMonth, selectedYear);
  };

  return (
    <div className="pb-24 px-4 pt-6 min-h-screen bg-gray-50 flex flex-col space-y-4">
      {/* Period Selection Grid */}
      <div className="flex space-x-3">
        <CustomSelect
          value={selectedYear}
          onChange={setSelectedYear}
          options={years}
          icon={Calendar}
        />
        <CustomSelect
          value={selectedMonth}
          onChange={setSelectedMonth}
          options={months}
          icon={Calendar}
        />
      </div>

      {/* Net Salary Card */}
      <motion.div
        key={`${selectedMonth}-${selectedYear}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-8 text-center text-white shadow-xl shadow-indigo-200"
      >
        <p className="text-sm font-medium text-white/80 mb-2">Net Salary</p>
        <h2 className="text-5xl font-bold mb-4">₹ 45,000</h2>
        <div className="space-y-1">
          <p className="text-sm font-semibold">{selectedMonth} {selectedYear}</p>
          <p className="text-xs text-white/70">Paid on {selectedMonth === 'December' ? 'January 1' : `${months[months.indexOf(selectedMonth) + 1] || 'January'} 1`}, {selectedMonth === 'December' ? parseInt(selectedYear) + 1 : selectedYear}</p>
        </div>
      </motion.div>

      {/* Earnings Card */}
      <Card className="rounded-[1.5rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-6">Earnings</h3>
        <div className="space-y-4">
          {earnings.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">{item.label}</span>
              <span className="font-bold text-text-main">{item.amount}</span>
            </div>
          ))}
          <div className="pt-4 border-t border-border flex justify-between items-center font-bold">
            <span className="text-text-main">Total Earnings</span>
            <span className="text-success">₹ 45,000</span>
          </div>
        </div>
      </Card>

      {/* Deductions Card */}
      <Card className="rounded-[1.5rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-6">Deductions</h3>
        <div className="space-y-4">
          {deductions.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">{item.label}</span>
              <span className="font-bold text-text-main">{item.amount}</span>
            </div>
          ))}
          <div className="pt-4 border-t border-border flex justify-between items-center font-bold">
            <span className="text-text-main">Total Deductions</span>
            <span className="text-error">₹ 5,000</span>
          </div>
        </div>
      </Card>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="w-full h-14 bg-[#6366f1] text-white rounded-2xl flex items-center justify-center space-x-2 font-bold shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
      >
        <Download size={20} />
        <span>Download PDF</span>
      </button>
    </div>
  );
};

export default Payslip;
