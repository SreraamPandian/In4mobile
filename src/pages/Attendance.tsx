import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import { format } from 'date-fns';

const Attendance = () => {
    const [activeTab, setActiveTab] = useState<'day' | 'queue'>('day');
    const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const mockDayAttendance = [
        {
            date: '2026-02-09',
            checkIn: '09:15 AM',
            checkOut: '06:30 PM',
            status: 'Present',
            workHours: '9h 15m',
            lat: '12.973388',
            lng: '80.248178'
        },
        {
            date: '2026-02-08',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'Present',
            workHours: '9h 00m',
            lat: '12.973388',
            lng: '80.248178'
        },
        {
            date: '2026-02-07',
            checkIn: '-',
            checkOut: '-',
            status: 'Week Off',
            workHours: '-',
            lat: '-',
            lng: '-'
        },
    ];

    const mockQueueData = [
        {
            date: '09 Feb 2026',
            time: '04:58 PM',
            type: 'OUT',
            lat: '12.9733897',
            lng: '80.2481787'
        },
        {
            date: '09 Feb 2026',
            time: '09:12 AM',
            type: 'IN',
            lat: '12.9734567',
            lng: '80.2484567'
        },
    ];

    const handleSubmit = () => {
        if (activeTab === 'day') {
            setAttendanceData(mockDayAttendance);
        } else {
            setAttendanceData(mockQueueData);
        }
        setHasSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-primary text-white px-6 py-4">
                <h1 className="text-lg font-bold mb-3 tracking-tight">Attendance</h1>

                {/* Tab Switcher */}
                <div className="flex bg-white/20 rounded-full p-1">
                    <button
                        onClick={() => {
                            setActiveTab('day');
                            setHasSubmitted(false);
                        }}
                        className={`flex-1 py-1.5 px-1 rounded-full text-xs font-bold transition-all ${activeTab === 'day'
                            ? 'bg-white text-primary shadow-md'
                            : 'text-white/80 hover:text-white'
                            }`}
                    >
                        Day Attendance
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('queue');
                            setAttendanceData(mockQueueData);
                            setHasSubmitted(true);
                        }}
                        className={`flex-1 py-1.5 px-1 rounded-full text-xs font-bold transition-all ${activeTab === 'queue'
                            ? 'bg-white text-primary shadow-md'
                            : 'text-white/80 hover:text-white'
                            }`}
                    >
                        Attendance Queue
                    </button>
                </div>
            </div>

            {/* Date Range and Submit (Only for Day Attendance) */}
            {activeTab === 'day' && (
                <div className="px-6 py-6 transition-all duration-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full h-12 px-4 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full h-12 px-4 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98]"
                    >
                        Submit
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="px-6 pb-6">
                {!hasSubmitted ? (
                    <Card>
                        <div className="text-center py-12">
                            <Calendar size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-sm font-medium text-text-muted px-4">Select date range and click Submit to view records</p>
                        </div>
                    </Card>
                ) : attendanceData.length === 0 ? (
                    <Card>
                        <div className="text-center py-12">
                            <p className="text-sm font-medium text-text-muted">No records found for selected period</p>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {activeTab === 'day' ? (
                            // Day Attendance View
                            attendanceData.map((record, idx) => (
                                <Card key={idx} className="overflow-hidden border-l-4 border-l-primary">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={16} className="text-primary" />
                                            <h4 className="font-bold text-base text-text-main">{format(new Date(record.date), 'dd MMM yyyy')}</h4>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${record.status === 'Present' ? 'bg-success/10 text-success' :
                                            record.status === 'Week Off' ? 'bg-primary/10 text-primary' :
                                                'bg-error/10 text-error'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border/60">
                                        <div>
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Check In</p>
                                            <div className="flex items-center space-x-1">
                                                {record.checkIn !== '-' && <Clock size={12} className="text-success" />}
                                                <p className="text-sm font-bold text-text-main">{record.checkIn}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Check Out</p>
                                            <div className="flex items-center space-x-1">
                                                {record.checkOut !== '-' && <Clock size={12} className="text-error" />}
                                                <p className="text-sm font-bold text-text-main">{record.checkOut}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Hours</p>
                                            <p className="text-sm font-bold text-primary">{record.workHours}</p>
                                        </div>
                                    </div>

                                    {record.lat !== '-' && (
                                        <div className="pt-3 flex justify-between">
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                                Lat: <span className="text-text-main font-bold ml-1">{record.lat}</span>
                                            </p>
                                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">
                                                Lng: <span className="text-text-main font-bold ml-1">{record.lng}</span>
                                            </p>
                                        </div>
                                    )}
                                </Card>
                            ))
                        ) : (
                            // Attendance Queue View (Matching Image Style)
                            attendanceData.map((item, idx) => (
                                <Card key={idx} noPadding className="bg-gray-50 border border-gray-200 overflow-hidden">
                                    <div className="px-4 py-3 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] font-medium text-text-main">{item.date}</span>
                                            <span className="text-[13px] font-medium text-text-main">{item.time}</span>
                                            <span className="text-[14px] font-black text-text-main">{item.type}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-text-main">
                                            <span className="text-[13px]">lat: {item.lat}</span>
                                            <span className="text-[13px]">lng: {item.lng}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;
