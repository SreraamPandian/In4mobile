import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';

const MonthlyAttendanceReport = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));

    // Mock attendance data
    const attendanceData: { [key: string]: string } = {
        '2026-01-01': 'PH',    // Public Holiday
        '2026-01-02': 'WFH',   // Work From Home
        '2026-01-03': 'WO',    // Week Off
        '2026-01-04': 'WO',
        '2026-01-05': 'AA',    // Full Absent
        '2026-01-06': 'AA',
        '2026-01-07': 'AA',
        '2026-01-08': 'AA',
        '2026-01-09': 'AA',
        '2026-01-10': 'WO',
        '2026-01-11': 'WO',
        '2026-01-12': 'AA',
        '2026-01-13': 'AA',
        '2026-01-14': 'AA',
        '2026-01-15': 'AA',
        '2026-01-16': 'AA',
        '2026-01-17': 'WO',
        '2026-01-18': 'WO',
        '2026-01-19': 'AA',
        '2026-01-20': 'AA',
        '2026-01-21': 'AA',
        '2026-01-22': 'AA',
        '2026-01-23': 'AA',
        '2026-01-24': 'WO',
        '2026-01-25': 'WO',
        '2026-01-26': 'AA',
        '2026-01-27': 'AA',
        '2026-01-28': 'AA',
        '2026-01-29': 'AA',
        '2026-01-30': 'AA',
        '2026-01-31': 'WO',
    };

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startDayOfWeek = getDay(monthStart);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PH': return 'text-purple-600';
            case 'WFH': return 'text-green-600';
            case 'WO': return 'text-blue-600';
            case 'AA': return 'text-red-600';
            default: return 'text-gray-400';
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'PH': return 'bg-purple-500';
            case 'WFH': return 'bg-green-500';
            case 'WO': return 'bg-blue-500';
            case 'AA': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    const legends = [
        { code: 'PH', label: 'Public Holiday', color: 'bg-purple-500' },
        { code: 'WFH', label: 'Full Work From Home', color: 'bg-green-500' },
        { code: 'WO', label: 'Week Off', color: 'bg-blue-500' },
        { code: 'AA', label: 'Full Absent', color: 'bg-red-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-primary text-white px-6 py-4">
                <div className="flex items-center space-x-3 mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold">Monthly Attendance Report</h1>
                </div>

                {/* Date Range Selectors */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-white/80 mb-1 block">From Date:</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:bg-white/20 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-white/80 mb-1 block">To Date:</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:bg-white/20 focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="px-6 py-6">
                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {weekDays.map((day) => (
                        <div key={day} className="text-center font-bold text-sm text-primary py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startDayOfWeek }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="aspect-square"></div>
                    ))}

                    {/* Days of the month */}
                    {daysInMonth.map((day) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const status = attendanceData[dateStr];
                        const dayNum = format(day, 'd');

                        return (
                            <div
                                key={dateStr}
                                className="aspect-square rounded-xl border-2 border-gray-200 bg-white flex flex-col items-center justify-center p-1 transition-all hover:shadow-lg"
                            >
                                <span className="text-base font-bold text-gray-600">{dayNum}</span>
                                {status && (
                                    <span className={`text-[10px] font-bold mt-0.5 ${getStatusColor(status)}`}>{status}</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legends */}
                <div className="mt-6">
                    <h3 className="font-bold text-base mb-4">Legends</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {legends.map((legend) => (
                            <div key={legend.code} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                                <div className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center">
                                    <span className={`font-bold text-sm ${getStatusColor(legend.code)}`}>{legend.code}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-text-main">{legend.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyAttendanceReport;
