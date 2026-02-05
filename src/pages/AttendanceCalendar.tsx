import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { motion } from 'framer-motion';

const AttendanceCalendar = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // Mock Attendance Data
    const attendanceData = [
        { date: '2026-02-01', status: 'Week Off' },
        { date: '2026-02-02', status: 'Present' },
        { date: '2026-02-03', status: 'Present' }, // Today
        { date: '2026-02-04', status: 'Absent' },
        { date: '2026-02-05', status: 'Leave' },
        { date: '2026-02-06', status: 'Present' },
        { date: '2026-02-07', status: 'Half Day' },
        { date: '2026-02-08', status: 'Week Off' },
        { date: '2026-02-14', status: 'Holiday' }, // Added Holiday
    ];

    const getStatus = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return attendanceData.find(d => d.date === dateStr)?.status || 'Future';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Present': return 'bg-success text-white';
            case 'Absent': return 'bg-error text-white';
            case 'Leave': return 'bg-rose-500 text-white'; // Changed to Rose
            case 'Half Day': return 'bg-amber-400 text-white'; // Changed to Amber
            case 'Holiday': return 'bg-blue-500 text-white'; // Changed to Blue
            case 'Week Off': return 'bg-gray-200 text-gray-400';
            case 'Future': return 'bg-transparent text-text-main';
            default: return 'bg-transparent text-text-main';
        }
    };

    const calendarDays = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center space-x-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-text-main" />
                </button>
                <h1 className="text-xl font-bold text-text-main">Attendance Calendar</h1>
            </div>

            <div className="p-6 space-y-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-border">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full text-primary transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <h2 className="text-lg font-bold text-text-main">{format(currentMonth, 'MMMM yyyy')}</h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full text-primary transition-colors">
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Legend - 3x3 Grid (3 columns, 2 rows for 6 items) */}


                {/* Calendar Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
                >
                    {/* Week Days Header */}
                    <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                        {weekDays.map(day => (
                            <div key={day} className="py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7">
                        {/* Offset for starting day */}
                        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-14 bg-gray-50/30 border-b border-r border-gray-50"></div>
                        ))}

                        {calendarDays.map((day) => {
                            const status = getStatus(day);
                            const isTodayDate = isToday(day);

                            return (
                                <div key={day.toString()} className="h-14 border-b border-r border-gray-50 relative flex items-center justify-center">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${getStatusColor(status)} ${isTodayDate ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                                        {format(day, 'd')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
                    <h3 className="text-lg font-bold mb-4 opacity-90">Monthly Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs opacity-70 mb-1">Present</p>
                            <p className="text-2xl font-bold">22</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs opacity-70 mb-1">Absent</p>
                            <p className="text-2xl font-bold">1</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs opacity-70 mb-1">Leaves</p>
                            <p className="text-2xl font-bold">2</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs opacity-70 mb-1">Late In</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>

                {/* Legend - 3x3 Grid (3 columns, 2 rows for 6 items) */}
                <div className="grid grid-cols-3 gap-3 text-xs justify-items-center sm:justify-items-start">
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-success"></div><span>Present</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-error"></div><span>Absent</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span>Leave</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span>Half Day</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span>Holiday</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-gray-200"></div><span>Week Off</span></div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalendar;
