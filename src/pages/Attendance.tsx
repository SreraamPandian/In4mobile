import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
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
            date: '2026-01-05',
            checkIn: '09:15 AM',
            checkOut: '06:30 PM',
            status: 'Present',
            workHours: '9h 15m',
            location: 'Office HQ'
        },
        {
            date: '2026-01-04',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'Present',
            workHours: '9h 00m',
            location: 'Office HQ'
        },
        {
            date: '2026-01-03',
            checkIn: '-',
            checkOut: '-',
            status: 'Week Off',
            workHours: '-',
            location: '-'
        },
    ];

    const mockQueueData = [
        {
            date: '2026-01-06',
            type: 'Leave Request',
            reason: 'Personal Work',
            status: 'Pending',
            appliedOn: '2026-01-02'
        },
        {
            date: '2026-01-10',
            type: 'Permission',
            reason: 'Doctor Appointment',
            status: 'Approved',
            appliedOn: '2026-01-03'
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
                <h1 className="text-xl font-bold mb-4">Attendance</h1>

                {/* Tab Switcher */}
                <div className="flex bg-white/20 rounded-full p-1">
                    <button
                        onClick={() => {
                            setActiveTab('day');
                            setHasSubmitted(false);
                        }}
                        className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all ${activeTab === 'day'
                                ? 'bg-white text-primary shadow-md'
                                : 'text-white'
                            }`}
                    >
                        Day Attendance
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('queue');
                            setHasSubmitted(false);
                        }}
                        className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all ${activeTab === 'queue'
                                ? 'bg-white text-primary shadow-md'
                                : 'text-white'
                            }`}
                    >
                        Attendance Queue
                    </button>
                </div>
            </div>

            {/* Date Range and Submit */}
            <div className="px-6 py-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-2">From Date:</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-2">To Date:</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                        />
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                >
                    Submit
                </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
                {!hasSubmitted ? (
                    <Card>
                        <div className="text-center py-12">
                            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-text-muted">Select date range and click Submit to view {activeTab === 'day' ? 'attendance records' : 'attendance queue'}</p>
                        </div>
                    </Card>
                ) : attendanceData.length === 0 ? (
                    <Card>
                        <div className="text-center py-12">
                            <p className="text-text-muted">No Data Found</p>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {activeTab === 'day' ? (
                            // Day Attendance View
                            attendanceData.map((record, idx) => (
                                <Card key={idx}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={18} className="text-primary" />
                                            <h4 className="font-bold text-base">{format(new Date(record.date), 'dd MMM yyyy')}</h4>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${record.status === 'Present' ? 'bg-success/10 text-success' :
                                                record.status === 'Week Off' ? 'bg-primary/10 text-primary' :
                                                    'bg-error/10 text-error'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check In</p>
                                            <div className="flex items-center space-x-1">
                                                <Clock size={14} className="text-success" />
                                                <p className="text-sm font-semibold">{record.checkIn}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check Out</p>
                                            <div className="flex items-center space-x-1">
                                                <Clock size={14} className="text-error" />
                                                <p className="text-sm font-semibold">{record.checkOut}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Work Hours</p>
                                            <p className="text-sm font-semibold text-primary">{record.workHours}</p>
                                        </div>
                                    </div>

                                    {record.location !== '-' && (
                                        <div className="mt-3 pt-3 border-t border-border">
                                            <p className="text-xs text-text-secondary">Location: <span className="font-medium text-text-main">{record.location}</span></p>
                                        </div>
                                    )}
                                </Card>
                            ))
                        ) : (
                            // Attendance Queue View
                            attendanceData.map((item, idx) => (
                                <Card key={idx}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-bold text-base">{item.type}</h4>
                                            <p className="text-sm text-text-muted">{format(new Date(item.date), 'dd MMM yyyy')}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${item.status === 'Approved' ? 'bg-success/10 text-success' :
                                                item.status === 'Rejected' ? 'bg-error/10 text-error' :
                                                    'bg-warning/10 text-warning'
                                            }`}>
                                            {item.status === 'Approved' ? <CheckCircle size={14} /> :
                                                item.status === 'Rejected' ? <XCircle size={14} /> :
                                                    <Clock size={14} />}
                                            <span>{item.status}</span>
                                        </span>
                                    </div>

                                    <div className="space-y-2 pt-3 border-t border-border">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Reason:</span>
                                            <span className="font-medium">{item.reason}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-secondary">Applied On:</span>
                                            <span className="font-medium">{format(new Date(item.appliedOn), 'dd MMM yyyy')}</span>
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
