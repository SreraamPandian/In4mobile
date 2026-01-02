import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, FileText, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, getDay } from 'date-fns';
import Card from '../components/ui/Card';

const Attendance = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportStartDate, setReportStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [reportEndDate, setReportEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Generate padding days for grid alignment
    const startDay = getDay(monthStart); // 0 = Sunday
    const paddingDays = Array(startDay).fill(null);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    // Mock status generator
    const getStatus = (date: Date) => {
        const day = date.getDate();
        if (getDay(date) === 0 || getDay(date) === 6) return 'weekend';
        if (day % 7 === 0) return 'absent';
        if (day % 5 === 0) return 'leave';
        return 'present';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present': return 'bg-success text-white';
            case 'absent': return 'bg-error text-white';
            case 'leave': return 'bg-primary text-white';
            case 'weekend': return 'bg-gray-100 text-text-muted';
            default: return 'bg-gray-100 text-text-main';
        }
    };

    const generateReport = () => {
        // In a real app, this would fetch data from API
        alert(`Generating report from ${reportStartDate} to ${reportEndDate}`);
        setShowReportModal(false);
    };

    return (
        <div className="pb-8">
            {/* Header */}
            <div className="bg-surface px-6 pt-8 pb-6 border-b border-border">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-text-main">Attendance</h1>
                    <button
                        onClick={() => setShowReportModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium shadow-sm hover:bg-primary-dark transition-colors"
                    >
                        <FileText size={16} />
                        <span>Monthly Report</span>
                    </button>
                </div>

                {/* Month Selector */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="p-2 hover:bg-background rounded-full transition-colors">
                        <ChevronLeft size={24} className="text-text-secondary" />
                    </button>
                    <h2 className="text-lg font-semibold text-text-main w-40 text-center">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-background rounded-full transition-colors">
                        <ChevronRight size={24} className="text-text-secondary" />
                    </button>
                </div>

                {/* Stats Circle */}
                <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="#E5E7EB" strokeWidth="8" fill="transparent" />
                            <circle cx="64" cy="64" r="60" stroke="#10B981" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="30" strokeLinecap="round" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="text-3xl font-bold text-text-main block">92%</span>
                            <span className="text-xs text-text-muted uppercase font-medium">Present</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="px-4 py-6">
                <div className="grid grid-cols-7 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                        <div key={idx} className="text-center text-xs font-medium text-text-muted py-2">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {paddingDays.map((_, i) => <div key={`pad-${i}`} />)}
                    {days.map((day, idx) => {
                        const status = getStatus(day);
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedDate(day)}
                                className={`aspect-square rounded-full flex flex-col items-center justify-center text-xs font-medium relative ${isSelected ? 'ring-2 ring-offset-2 ring-primary z-10' : ''
                                    } ${getStatusColor(status)}`}
                            >
                                {format(day, 'd')}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Details */}
            <div className="px-6">
                <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
                    {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                <Card>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(getStatus(selectedDate)).split(' ')[0]}`} />
                            <span className="font-semibold text-text-main capitalize">{getStatus(selectedDate)}</span>
                        </div>
                        <span className="text-sm text-text-muted">8h 45m</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center space-x-2 text-text-muted mb-1">
                                <Clock size={14} />
                                <span className="text-xs">Check In</span>
                            </div>
                            <p className="font-semibold text-text-main">09:15 AM</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 text-text-muted mb-1">
                                <Clock size={14} />
                                <span className="text-xs">Check Out</span>
                            </div>
                            <p className="font-semibold text-text-main">06:00 PM</p>
                        </div>
                        <div className="col-span-2">
                            <div className="flex items-center space-x-2 text-text-muted mb-1">
                                <MapPin size={14} />
                                <span className="text-xs">Location</span>
                            </div>
                            <p className="font-semibold text-text-main">Main Office, Mumbai</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Legend */}
            <div className="px-6 mt-6 flex flex-wrap gap-4 justify-center">
                {[
                    { label: 'Present', color: 'bg-success' },
                    { label: 'Absent', color: 'bg-error' },
                    { label: 'Leave', color: 'bg-primary' },
                    { label: 'Holiday', color: 'bg-gray-200' },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-xs text-text-secondary">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Monthly Report Modal */}
            <AnimatePresence>
                {showReportModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
                            onClick={() => setShowReportModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[70] overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                <h3 className="font-bold text-xl text-center">Monthly Attendance Report</h3>
                                <p className="text-sm text-text-muted text-center mt-1">Select date range for your report</p>
                            </div>
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-text-main mb-3">From Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={reportStartDate}
                                            onChange={(e) => setReportStartDate(e.target.value)}
                                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text-main mb-3">To Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={reportEndDate}
                                            onChange={(e) => setReportEndDate(e.target.value)}
                                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button
                                        onClick={() => setShowReportModal(false)}
                                        className="py-4 bg-gray-100 text-text-main rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={generateReport}
                                        className="py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                                    >
                                        Generate Report
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Attendance;
