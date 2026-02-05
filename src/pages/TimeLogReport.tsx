import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogIn, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

import ReportFilter from '../components/ReportFilter';

const TimeLogReport = () => {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState('2026-01-28');
    const [toDate, setToDate] = useState('2026-02-04');

    const handleGenerateReport = (start: string, end: string) => {
        setFromDate(start);
        setToDate(end);
    };

    const logs = [
        {
            date: '28 Jan 2026',
            checkIn: '09:08 AM',
            checkOut: '09:04 PM',
            sourceIn: 'access_control',
            sourceOut: 'access_control'
        },
        {
            date: '29 Jan 2026',
            checkIn: '08:34 AM',
            checkOut: '05:30 PM',
            sourceIn: 'access_control',
            sourceOut: 'access_control'
        },
        {
            date: '30 Jan 2026',
            checkIn: '08:34 AM',
            checkOut: '05:18 PM',
            sourceIn: 'access_control',
            sourceOut: 'access_control'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-text-main">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-primary text-white border-b border-white/10 px-6 py-4 flex items-center space-x-3 shadow-md">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-white" />
                </button>
                <h1 className="text-xl font-bold tracking-tight">Time Log Report</h1>
            </div>

            <div className="px-4 py-4 space-y-6">
                {/* Filter Section */}
                <ReportFilter onGenerateReport={handleGenerateReport} />

                {/* Logs List */}
                <div className="space-y-4">
                    {logs.map((log, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="p-5 border-none shadow-sm hover:shadow-md transition-shadow">
                                <div className="grid grid-cols-2 gap-6 relative">
                                    {/* Vertical Divider */}
                                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-100 -ml-px"></div>

                                    {/* Check In */}
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-1.5 text-gray-400 mb-2">
                                            <LogIn size={14} />
                                            <span className="text-xs font-semibold uppercase">Check In</span>
                                        </div>
                                        <p className="font-bold text-text-main text-sm">{log.date}</p>
                                        <p className="text-xl font-bold text-text-main tracking-tight">{log.checkIn}</p>
                                        <div className="pt-3 mt-1">
                                            <p className="text-[10px] text-gray-400 font-medium">Source In</p>
                                            <p className="text-xs font-semibold text-text-secondary">{log.sourceIn}</p>
                                        </div>
                                    </div>

                                    {/* Check Out */}
                                    <div className="space-y-1 pl-2">
                                        <div className="flex items-center space-x-1.5 text-gray-400 mb-2">
                                            <LogOut size={14} />
                                            <span className="text-xs font-semibold uppercase">Check Out</span>
                                        </div>
                                        <p className="font-bold text-text-main text-sm">{log.date}</p>
                                        <p className="text-xl font-bold text-text-main tracking-tight">{log.checkOut}</p>
                                        <div className="pt-3 mt-1 text-right">
                                            <p className="text-[10px] text-gray-400 font-medium">Source Out</p>
                                            <p className="text-xs font-semibold text-text-secondary">{log.sourceOut}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeLogReport;
