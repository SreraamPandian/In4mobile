import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay } from 'date-fns';

const MonthlyAttendanceReport = () => {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));

    // Mock attendance data (using same keys as before but mapping them later)
    const attendanceData: { [key: string]: string } = {
        '2026-01-01': 'PH',
        '2026-01-02': 'WFH',
        '2026-01-05': 'PP',
        '2026-01-12': 'AA',
        '2026-02-01': 'WO',
        '2026-02-02': 'PP',
        '2026-02-03': 'PP',
        '2026-02-04': 'PP',
        '2026-02-05': 'PP',
        '2026-02-06': 'PP',
        '2026-02-07': 'WO',
        '2026-02-08': 'WO',
        '2026-02-09': 'PP',
        '2026-02-10': 'PP',
        '2026-02-11': 'PP',
        '2026-02-12': 'WFH',
        '2026-02-13': 'PP',
        '2026-02-14': 'PH',
        '2026-02-15': 'WO',
        '2026-02-16': 'PP',
        '2026-02-17': 'PP',
        '2026-02-18': 'PP',
        '2026-02-19': 'PP',
        '2026-02-20': 'PP',
        '2026-02-21': 'WO',
        '2026-02-22': 'WO',
        '2026-02-23': 'PP',
        '2026-02-24': 'PP',
        '2026-02-25': 'PP',
        '2026-02-26': 'PP',
        '2026-02-27': 'PP',
        '2026-02-28': 'WO',
    };

    const getStatus = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return attendanceData[dateStr] || 'Future';
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'PP': return 'PP';
            case 'AA': return 'AA';
            case 'PH': return 'HO'; // Map PH to HO
            case 'WFH': return 'WFM'; // Map WFH to WFM
            case 'WO': return 'WO';
            case 'Future': return '';
            default: return '';
        }
    };

    const getStatusStyle = (label: string) => {
        switch (label) {
            case 'PP': return 'text-green-600';
            case 'AA': return 'text-red-600';
            case 'HO': return 'text-blue-600';
            case 'WFM': return 'text-purple-600';
            case 'WO': return 'text-gray-400';
            default: return 'text-gray-300';
        }
    };

    const calendarDays = eachDayOfInterval({
        start: new Date(fromDate),
        end: new Date(toDate)
    });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pickerType, setPickerType] = useState<'from' | 'to'>('from');
    // Internal state for the picker's current view (month/year)
    const [pickerViewDate, setPickerViewDate] = useState(new Date());

    const handleOpenPicker = (type: 'from' | 'to') => {
        setPickerType(type);
        setPickerViewDate(new Date(type === 'from' ? fromDate : toDate));
        setShowDatePicker(true);
    };

    const handleDateSelect = (day: Date) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        if (pickerType === 'from') {
            setFromDate(dateStr);
        } else {
            setToDate(dateStr);
        }
        setShowDatePicker(false);
    };

    const nextPickerMonth = () => setPickerViewDate(addMonths(pickerViewDate, 1));
    const prevPickerMonth = () => setPickerViewDate(subMonths(pickerViewDate, 1));

    const pickerDays = eachDayOfInterval({
        start: startOfMonth(pickerViewDate),
        end: endOfMonth(pickerViewDate)
    });

    // Calculate empty placeholder days for alignment
    const startDayIndex = getDay(startOfMonth(pickerViewDate));

    // Calculate summary statistics based on the currently visible range
    const summaryStats = calendarDays.reduce((acc, day) => {
        const rawStatus = getStatus(day);
        const code = getStatusLabel(rawStatus);

        if (code === 'PP') acc.present++;
        else if (code === 'AA') acc.absent++;
        else if (code === 'LV') acc.leave++;
        else if (code === 'WFM') acc.wfh++;
        else if (code === 'HO') acc.holiday++;
        else if (code === 'AP') acc.halfDay++;
        else if (code === 'WO') acc.weekOff++;

        return acc;
    }, { present: 0, absent: 0, leave: 0, wfh: 0, holiday: 0, halfDay: 0, weekOff: 0 });

    return (
        <div className="min-h-screen bg-gray-50 pb-24 relative">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-primary text-white px-6 py-4 shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold">Monthly Attendance Report</h1>
                </div>

                {/* Date Inputs - Trigger Custom Picker */}
                <div className="flex space-x-4">
                    <div className="relative flex-1">
                        <label className="text-xs text-white/80 mb-1 pl-1 block uppercase tracking-wider font-medium">From</label>
                        <div
                            onClick={() => handleOpenPicker('from')}
                            className="w-full bg-white text-primary font-medium py-3 px-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer"
                        >
                            <span>{format(new Date(fromDate), 'dd MMM yyyy')}</span>
                            <Calendar size={18} className="text-primary/70" />
                        </div>
                    </div>
                    <div className="relative flex-1">
                        <label className="text-xs text-white/80 mb-1 pl-1 block uppercase tracking-wider font-medium">To</label>
                        <div
                            onClick={() => handleOpenPicker('to')}
                            className="w-full bg-white text-primary font-medium py-3 px-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer"
                        >
                            <span>{format(new Date(toDate), 'dd MMM yyyy')}</span>
                            <Calendar size={18} className="text-primary/70" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Calendar Grid & Summary & Legend (Unchanged) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                        {weekDays.map(day => (<div key={day} className="py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">{day}</div>))}
                    </div>
                    <div className="grid grid-cols-7">
                        {Array.from({ length: new Date(fromDate).getDay() }).map((_, i) => (<div key={`empty-${i}`} className="h-16 bg-gray-50/30 border-b border-r border-gray-50 last:border-r-0"></div>))}
                        {calendarDays.map((day) => {
                            const status = getStatus(day);
                            const code = getStatusLabel(status);
                            const style = getStatusStyle(code);
                            const dayNum = format(day, 'd');
                            const isTodayDate = new Date().toDateString() === day.toDateString();
                            return (
                                <div key={day.toString()} className="h-16 border-b border-r border-gray-100 relative p-1 group">
                                    <span className={`absolute top-1 right-2 text-[10px] font-bold ${isTodayDate ? 'text-primary' : 'text-gray-400'}`}>{dayNum}</span>
                                    {status !== 'Future' && code ? (<div className={`w-full h-full flex items-center justify-center text-sm font-medium transition-all ${style} ${isTodayDate ? 'bg-primary/5 rounded-lg' : ''}`}>{code}</div>) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
                    <h3 className="text-lg font-bold mb-4 opacity-90">Monthly Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3"> <p className="text-xs opacity-70 mb-1">Present (PP)</p> <p className="text-2xl font-bold">{summaryStats.present}</p> </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3"> <p className="text-xs opacity-70 mb-1">Absent (AA)</p> <p className="text-2xl font-bold">{summaryStats.absent}</p> </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3"> <p className="text-xs opacity-70 mb-1">Leaves (LV)</p> <p className="text-2xl font-bold">{summaryStats.leave}</p> </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3"> <p className="text-xs opacity-70 mb-1">Late In</p> <p className="text-2xl font-bold">0</p> </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Legends</h3>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center space-x-2"> <span className="w-8 flex justify-center font-medium text-green-600">PP</span> <span className="text-gray-600 font-medium">Full Present</span> </div>
                        <div className="flex items-center space-x-2"> <span className="w-8 flex justify-center font-medium text-red-600">AA</span> <span className="text-gray-600 font-medium">Full Absent</span> </div>
                        <div className="flex items-center space-x-2"> <span className="w-8 flex justify-center font-medium text-rose-600">LV</span> <span className="text-gray-600 font-medium">Leave</span> </div>
                        <div className="flex items-center space-x-2"> <span className="w-8 flex justify-center font-medium text-amber-600">AP</span> <span className="text-gray-600 font-medium">Half Day</span> </div>
                        <div className="flex items-center space-x-2"> <span className="w-8 flex justify-center font-medium text-blue-600">HO</span> <span className="text-gray-600 font-medium">Holiday</span> </div>
                        <div className="flex items-center space-x-2"> <span className="w-8 flex justify-center font-medium text-gray-400">WO</span> <span className="text-gray-600 font-medium">Week Off</span> </div>
                        <div className="flex items-center space-x-2"> <span className="w-8 flex justify-center font-medium text-purple-600">WFM</span> <span className="text-gray-600 font-medium">Work From Home</span> </div>
                    </div>
                </div>
            </div>

            {/* Custom Date Picker Modal */}
            {showDatePicker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">
                                    SELECT {pickerType} DATE
                                </p>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {format(pickerViewDate, 'MMMM yyyy')}
                                </h2>
                            </div>
                            <button
                                onClick={() => setShowDatePicker(false)}
                                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-7 mb-4">
                            {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
                                <div key={day} className="text-center text-xs font-semibold text-gray-300">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-y-4 mb-6">
                            {Array.from({ length: startDayIndex }).map((_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}
                            {pickerDays.map(day => {
                                const isSelected = pickerType === 'from'
                                    ? format(day, 'yyyy-MM-dd') === fromDate
                                    : format(day, 'yyyy-MM-dd') === toDate;

                                return (
                                    <button
                                        key={day.toString()}
                                        onClick={() => handleDateSelect(day)}
                                        className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium transition-all ${isSelected
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {format(day, 'd')}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer Navigation */}
                        <div className="flex justify-between items-center text-sm font-semibold text-gray-400 border-t border-gray-100 pt-4">
                            <button onClick={prevPickerMonth} className="flex items-center hover:text-indigo-600 transition-colors">
                                <ChevronLeft size={16} className="mr-1" /> Prev
                            </button>
                            <button onClick={nextPickerMonth} className="flex items-center hover:text-indigo-600 transition-colors">
                                Next <ChevronRight size={16} className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthlyAttendanceReport;
