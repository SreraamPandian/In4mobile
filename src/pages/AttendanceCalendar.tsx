import { useState } from 'react';
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
        { date: '2026-02-12', status: 'Work From Home' },
    ];

    const getStatus = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return attendanceData.find(d => d.date === dateStr)?.status || 'Future';
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'Present': return 'PP';
            case 'Absent': return 'AA';
            case 'Leave': return 'LV';
            case 'Half Day': return 'AP'; // Changed to AP
            case 'Holiday': return 'HO';
            case 'Week Off': return 'WO';
            case 'Work From Home': return 'WFM';
            default: return '';
        }
    };

    const getStatusStyle = (status: string) => {
        // Updated to use text colors only, no backgrounds
        switch (status) {
            case 'Present': return 'text-green-600';
            case 'Absent': return 'text-red-600';
            case 'Leave': return 'text-rose-600';
            case 'Half Day': return 'text-amber-600';
            case 'Holiday': return 'text-blue-600';
            case 'Week Off': return 'text-gray-400';
            case 'Work From Home': return 'text-purple-600';
            case 'Future': return 'text-gray-300';
            default: return 'text-gray-300';
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
                            <div key={day} className="py-3 text-center text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7">
                        {/* Offset for starting day */}
                        {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
                            <div key={`empty-${i}`} className="h-16 bg-gray-50/30 border-b border-r border-gray-50 last:border-r-0"></div>
                        ))}

                        {calendarDays.map((day) => {
                            const status = getStatus(day);
                            const code = getStatusLabel(status);
                            const isTodayDate = isToday(day);

                            return (
                                <div key={day.toString()} className="h-16 border-b border-r border-gray-100 relative p-1 group">
                                    {/* Date Number */}
                                    <span className={`absolute top-1 right-2 text-[10px] font-bold ${isTodayDate ? 'text-primary' : 'text-gray-400'}`}>
                                        {format(day, 'd')}
                                    </span>

                                    {/* Status Code - Text Only */}
                                    {status !== 'Future' ? (
                                        <div className={`w-full h-full flex items-center justify-center text-sm font-medium transition-all ${getStatusStyle(status)} ${isTodayDate ? 'bg-primary/5 rounded-lg' : ''}`}>
                                            {code}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"></div>
                                    )}
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
                            <p className="text-xs opacity-70 mb-1">Present (PP)</p>
                            <p className="text-2xl font-bold">22</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs opacity-70 mb-1">Absent (AA)</p>
                            <p className="text-2xl font-bold">1</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs opacity-70 mb-1">Leaves (LV)</p>
                            <p className="text-2xl font-bold">2</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <p className="text-xs opacity-70 mb-1">Late In</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>

                {/* Legend - Updated with Codes - Moved to Bottom */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Legends</h3>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center space-x-2">
                            <span className="w-8 flex justify-center font-medium text-green-600">PP</span>
                            <span className="text-gray-600 font-medium">Present</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-8 flex justify-center font-medium text-red-600">AA</span>
                            <span className="text-gray-600 font-medium">Absent</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-8 flex justify-center font-medium text-rose-600">LV</span>
                            <span className="text-gray-600 font-medium">Leave</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-8 flex justify-center font-medium text-amber-600">AP</span>
                            <span className="text-gray-600 font-medium">Half Day</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-8 flex justify-center font-medium text-blue-600">HO</span>
                            <span className="text-gray-600 font-medium">Holiday</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-8 flex justify-center font-medium text-gray-400">WO</span>
                            <span className="text-gray-600 font-medium">Week Off</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-8 flex justify-center font-medium text-purple-600">WFM</span>
                            <span className="text-gray-600 font-medium">Work From Home</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AttendanceCalendar;
