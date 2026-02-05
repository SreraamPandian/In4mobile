import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';

const Payslip = () => {
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [selectedYear, setSelectedYear] = useState('2025');

  const years = ['2026', '2025', '2024'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Mock history data
  const history = [
    { month: 'November', year: '2025' },
    { month: 'October', year: '2025' },
    { month: 'September', year: '2025' },
    { month: 'August', year: '2025' },
  ];

  const handleDownload = (month: string, year: string) => {
    try {
      const filename = `Payslip_${month}_${year}.txt`;

      // Create a text-based payslip receipt
      const content = `
*************************************
        PAYSLIP RECEIPT
*************************************
Employee Name: John Doe
Employee ID: EMP123
Month/Year: ${month} ${year}

EARNINGS
-------------------------------------
Basic Salary ............ ₹ 30,000
HRA ..................... ₹ 10,000
Special Allowance ....... ₹  5,000
-------------------------------------
Total Earnings .......... ₹ 45,000

DEDUCTIONS
-------------------------------------
PF Contribution ......... ₹  2,000
Professional Tax ........ ₹    500
TDS ..................... ₹  2,500
-------------------------------------
Total Deductions ........ ₹  5,000

*************************************
NET SALARY: ₹ 40,000
*************************************
      `;

      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="pb-24 px-6 pt-6 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-bold text-text-main mb-2">Payslip</h1>
        <p className="text-text-secondary text-sm">Select a period to download your payslip</p>
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 space-y-8">

          <div className="space-y-6">
            {/* Year Selector - Scrolling */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-1">Year</label>
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`flex-shrink-0 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedYear === year
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                      : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100'
                      }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Selector - Scrolling */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-1">Month</label>
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedMonth === month
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100'
                      }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={() => handleDownload(selectedMonth, selectedYear)}
            fullWidth
            size="lg"
            className="h-14 text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all font-bold"
          >
            <Download size={20} className="mr-2 stroke-[2.5]" />
            Download Payslip
          </Button>
        </div>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 w-full max-w-md"
      >
        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4 px-2">Previous Payslips</h3>
        <div className="space-y-3">
          {history.map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleDownload(item.month, item.year)}
              className="w-full p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all text-left flex justify-between items-center group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Calendar size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-semibold text-text-main">{item.month} {item.year}</span>
              </div>
              <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                <Download size={16} />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Payslip;
