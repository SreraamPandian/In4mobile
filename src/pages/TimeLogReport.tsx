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

    // Read remarks saved from Dashboard check-in/out
    const savedRemarks: Record<string, { checkInRemark?: string; checkOutRemark?: string; checkInTime?: string; checkOutTime?: string }> =
        JSON.parse(localStorage.getItem('attendanceRemarks') || '{}');

    const handleGenerateReport = (start: string, end: string) => {
        setFromDate(start);
        setToDate(end);
    };

    const todayKey = new Date().toISOString().split('T')[0];
    const todayEntry = savedRemarks[todayKey];

    const logs = [
        {
            date: '28 Jan 2026',
            dateKey: '2026-01-28',
            checkIn: '09:08 AM',
            checkOut: '09:04 PM',
            sourceIn: 'access_control',
            sourceOut: 'access_control'
        },
        {
            date: '29 Jan 2026',
            dateKey: '2026-01-29',
            checkIn: '08:34 AM',
            checkOut: '05:30 PM',
            sourceIn: 'access_control',
            sourceOut: 'access_control'
        },
        {
            date: '30 Jan 2026',
            dateKey: '2026-01-30',
            checkIn: '08:34 AM',
            checkOut: '05:18 PM',
            sourceIn: 'access_control',
            sourceOut: 'access_control'
        },
        {
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            dateKey: todayKey,
            checkIn: todayEntry?.checkInTime || '-',
            checkOut: todayEntry?.checkOutTime || '-',
            sourceIn: todayEntry?.checkInTime ? 'mobile_app' : '-',
            sourceOut: todayEntry?.checkOutTime ? 'mobile_app' : '-',
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
                <div className="space-y-2.5">
                    {logs.map((log, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.07 }}
                        >
                            <Card className="p-3.5 border-none shadow-sm hover:shadow-md transition-shadow">
                                <div className="grid grid-cols-2 gap-3 relative">
                                    {/* Vertical Divider */}
                                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-100 -ml-px"></div>

                                    {/* Check In */}
                                    <div className="space-y-0.5">
                                        <div className="flex items-center space-x-1 text-gray-400 mb-1.5">
                                            <LogIn size={12} />
                                            <span className="text-[10px] font-semibold uppercase tracking-wide">Check In</span>
                                        </div>
                                        <p className="font-semibold text-text-main text-[11px]">{log.date}</p>
                                        <p className="text-base font-bold text-text-main tracking-tight">{log.checkIn}</p>
                                        <div className="pt-1.5">
                                            <p className="text-[9px] text-gray-400 font-medium">Source In</p>
                                            <p className="text-[11px] font-semibold text-text-secondary">{log.sourceIn}</p>
                                        </div>
                                        {savedRemarks[log.dateKey]?.checkInRemark && (
                                            <div className="pt-0.5">
                                                <p className="text-[9px] text-gray-400 font-medium">Remarks</p>
                                                <p className="text-[11px] font-semibold text-primary italic">&quot;{savedRemarks[log.dateKey]?.checkInRemark}&quot;</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Check Out */}
                                    <div className="space-y-0.5 pl-2">
                                        <div className="flex items-center space-x-1 text-gray-400 mb-1.5">
                                            <LogOut size={12} />
                                            <span className="text-[10px] font-semibold uppercase tracking-wide">Check Out</span>
                                        </div>
                                        <p className="font-semibold text-text-main text-[11px]">{log.date}</p>
                                        <p className="text-base font-bold text-text-main tracking-tight">{log.checkOut}</p>
                                        <div className="pt-1.5 text-right">
                                            <p className="text-[9px] text-gray-400 font-medium">Source Out</p>
                                            <p className="text-[11px] font-semibold text-text-secondary">{log.sourceOut}</p>
                                        </div>
                                        {savedRemarks[log.dateKey]?.checkOutRemark && (
                                            <div className="pt-0.5 text-right">
                                                <p className="text-[9px] text-gray-400 font-medium">Remarks</p>
                                                <p className="text-[11px] font-semibold text-primary italic">&quot;{savedRemarks[log.dateKey]?.checkOutRemark}&quot;</p>
                                            </div>
                                        )}
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
