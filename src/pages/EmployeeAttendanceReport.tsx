import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Search, Clock, CheckCircle, XCircle, Eye, MapPin } from 'lucide-react';
import Card from '../components/ui/Card';
import { format } from 'date-fns';

const EmployeeAttendanceReport = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [searchQuery, setSearchQuery] = useState('');
    const [reportData, setReportData] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    const allEmployees = [
        {
            empCode: 'EMP001',
            empName: 'John Doe',
            checkIn: '09:15 AM',
            checkOut: '06:30 PM',
            status: 'Present',
            workHours: '9h 15m',
            location: 'Office HQ, Chennai',
            coordinates: { lat: 13.0827, lng: 80.2707 },
            punchLogs: [
                { type: 'Check In', time: '09:15 AM', location: 'Office HQ, Chennai', coords: { lat: 13.0827, lng: 80.2707 } },
                { type: 'Check Out', time: '06:30 PM', location: 'Office HQ, Chennai', coords: { lat: 13.0827, lng: 80.2707 } }
            ]
        },
        {
            empCode: 'EMP002',
            empName: 'Jane Smith',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'Present',
            workHours: '9h 00m',
            location: 'Branch Office, Mumbai',
            coordinates: { lat: 19.0760, lng: 72.8777 },
            punchLogs: [
                { type: 'Check In', time: '09:00 AM', location: 'Branch Office, Mumbai', coords: { lat: 19.0760, lng: 72.8777 } },
                { type: 'Check Out', time: '06:00 PM', location: 'Branch Office, Mumbai', coords: { lat: 19.0760, lng: 72.8777 } }
            ]
        },
        {
            empCode: 'EMP003',
            empName: 'Mike Johnson',
            checkIn: '09:30 AM',
            checkOut: '06:45 PM',
            status: 'Present',
            workHours: '9h 15m',
            location: 'Remote - Bangalore',
            coordinates: { lat: 12.9716, lng: 77.5946 },
            punchLogs: [
                { type: 'Check In', time: '09:30 AM', location: 'Remote - Bangalore', coords: { lat: 12.9716, lng: 77.5946 } },
                { type: 'Check Out', time: '06:45 PM', location: 'Remote - Bangalore', coords: { lat: 12.9716, lng: 77.5946 } }
            ]
        },
        {
            empCode: 'EMP004',
            empName: 'Sarah Williams',
            checkIn: '-',
            checkOut: '-',
            status: 'Absent',
            workHours: '-',
            location: '-',
            coordinates: null,
            punchLogs: []
        },
    ];

    const handleSearch = () => {
        if (searchQuery.trim()) {
            const filtered = allEmployees.filter(emp =>
                emp.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.empCode.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setReportData(filtered);
        } else {
            setReportData(allEmployees);
        }
        setHasSearched(true);
    };

    const handleViewLogs = (emp: any) => {
        setSelectedEmployee(emp);
    };

    const handleViewOnMap = (_coords: { lat: number, lng: number }, _locationName: string = '') => {
        navigate('/map-view');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-primary text-white px-6 py-4">
                <div className="flex items-center space-x-3 mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold">Employee Attendance Report</h1>
                </div>

                <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                        <Calendar size={20} />
                        <span className="font-medium">Date: {format(new Date(selectedDate), 'dd MMM yyyy')}</span>
                    </div>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-white text-gray-900 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer"
                    />
                </div>
            </div>

            {/* Search Section */}
            <div className="px-6 py-6">
                <label className="block text-sm font-semibold text-text-main mb-3">Search Employee</label>
                <div className="flex flex-col space-y-3">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter employee name or code..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
                    >
                        <Search size={20} />
                        <span>Search</span>
                    </button>
                </div>
            </div>

            {hasSearched && (
                <div className="px-6 pb-6">
                    <h3 className="font-bold text-base mb-4">
                        Attendance Report - {reportData.length} employee(s) found
                    </h3>

                    {reportData.length === 0 ? (
                        <Card>
                            <p className="text-center text-text-muted py-8">No employees found matching your search.</p>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {reportData.map((emp, idx) => (
                                <Card key={idx}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-bold text-base">{emp.empName}</h4>
                                            <p className="text-sm text-text-muted">{emp.empCode}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${emp.status === 'Present' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                                            }`}>
                                            {emp.status === 'Present' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                            <span>{emp.status}</span>
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-3 pt-3 border-t border-border">
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check In</p>
                                            <div className="flex items-center space-x-1">
                                                <Clock size={14} className="text-success" />
                                                <p className="text-sm font-semibold">{emp.checkIn}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check Out</p>
                                            <div className="flex items-center space-x-1">
                                                <Clock size={14} className="text-error" />
                                                <p className="text-sm font-semibold">{emp.checkOut}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Work Hours</p>
                                            <p className="text-sm font-semibold text-primary">{emp.workHours}</p>
                                        </div>
                                    </div>

                                    {emp.location !== '-' && (
                                        <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg mb-3">
                                            <MapPin size={16} className="text-primary mt-0.5" />
                                            <p className="text-sm flex-1">{emp.location}</p>
                                        </div>
                                    )}

                                    <div className="flex justify-center pt-3 border-t border-border">
                                        <button
                                            onClick={() => handleViewLogs(emp)}
                                            className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1 text-sm"
                                        >
                                            <Eye size={16} />
                                            <span>View Logs</span>
                                        </button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {!hasSearched && (
                <div className="px-6">
                    <Card>
                        <div className="text-center py-12">
                            <Search size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-text-muted">Enter employee name or code and click search to view attendance report</p>
                        </div>
                    </Card>
                </div>
            )}

            {selectedEmployee && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
                    <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-hidden">
                        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">{selectedEmployee.empName}</h3>
                                <p className="text-sm text-text-muted">{selectedEmployee.empCode}</p>
                            </div>
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="px-6 py-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                            <h4 className="font-bold text-base mb-4 flex items-center space-x-2">
                                <Clock size={20} className="text-primary" />
                                <span>Punch Logs</span>
                            </h4>

                            {selectedEmployee.punchLogs.length === 0 ? (
                                <Card>
                                    <p className="text-center text-text-muted py-8">No punch logs available</p>
                                </Card>
                            ) : (
                                <div className="space-y-3">
                                    {selectedEmployee.punchLogs.map((log: any, idx: number) => (
                                        <Card key={idx}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.type === 'Check In' ? 'bg-success/10' : 'bg-error/10'
                                                        }`}>
                                                        <Clock size={20} className={log.type === 'Check In' ? 'text-success' : 'text-error'} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-sm">{log.type}</h5>
                                                        <p className="text-xs text-text-muted">{log.time}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                                                <MapPin size={16} className="text-primary mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{log.location}</p>
                                                    <p className="text-xs text-text-muted mt-1">
                                                        Lat: {log.coords.lat}, Lng: {log.coords.lng}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleViewOnMap(log.coords, log.location)}
                                                    className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors"
                                                >
                                                    Map
                                                </button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeAttendanceReport;
