import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, differenceInDays, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import DatePicker from './ui/DatePicker';

interface ReportFilterProps {
    onGenerateReport: (startDate: string, endDate: string) => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ onGenerateReport }) => {
    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (startDate && endDate) {
            const start = parseISO(startDate);
            const end = parseISO(endDate);
            // Add 1 to include the start day
            setDuration(differenceInDays(end, start) + 1);
        }
    }, [startDate, endDate]);



    const handleGenerate = () => {
        onGenerateReport(startDate, endDate);
    };

    return (
        <div className="space-y-4">
            {/* Date Inputs Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4"
            >
                <DatePicker
                    label="START DATE"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                />

                <DatePicker
                    label="END DATE"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                />
            </motion.div>

            {/* Action Bar */}
            <button
                onClick={handleGenerate}
                className="w-full bg-[#111111] text-white rounded-[2rem] p-4 flex items-center justify-between shadow-xl shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
                <div className="flex flex-col items-start px-2">
                    <span className="text-base font-bold">Generate Report</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{duration > 0 ? duration : 0} Days selected</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ChevronRight size={20} className="text-white" />
                </div>
            </button>
        </div>
    );
};

export default ReportFilter;
