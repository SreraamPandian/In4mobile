import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth } from 'date-fns';

interface ReportFilterProps {
    onGenerateReport: (startDate: string, endDate: string) => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ onGenerateReport }) => {
    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));

    const handleGenerate = () => {
        onGenerateReport(startDate, endDate);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-border"
        >
            <h3 className="font-bold text-lg mb-4">Filter Report</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">From Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">To Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                >
                    Generate Report
                </button>
            </div>
        </motion.div>
    );
};

export default ReportFilter;
