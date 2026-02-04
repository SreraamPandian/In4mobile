import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import Card from '../components/ui/Card';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    const employees = [
        {
            empCode: 'EMP001',
            empName: 'John Doe',
            status: 'Present',
            checkIn: '09:15 AM',
            checkOut: '06:30 PM',
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
            status: 'Present',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
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
            status: 'Present',
            checkIn: '09:30 AM',
            checkOut: '-',
            location: 'Remote - Bangalore',
            coordinates: { lat: 12.9716, lng: 77.5946 },
            punchLogs: [
                { type: 'Check In', time: '09:30 AM', location: 'Remote - Bangalore', coords: { lat: 12.9716, lng: 77.5946 } }
            ]
        },
        {
            empCode: 'EMP004',
            empName: 'Sarah Williams',
            status: 'Absent',
            checkIn: '-',
            checkOut: '-',
            location: '-',
            coordinates: null,
            punchLogs: []
        },
    ];

    const filteredEmployees = searchQuery.trim()
        ? employees.filter(emp =>
            emp.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.empCode.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : employees;

    const handleViewDetails = (emp: any) => {
        setSelectedEmployee(emp);
    };

    const handleViewOnMap = (coords: { lat: number, lng: number }) => {
        // Open Google Maps with coordinates
        window.open(`https://www.google.com/maps?q=${coords.lat},${coords.lng}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-primary text-white px-6 py-4">
                <div className="flex items-center space-x-3 mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold">Employee List</h1>
                </div>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search employee name or code..."
                        className="w-full px-4 py-3 pl-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:bg-white/20 focus:outline-none"
                    />
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                </div>
            </div>

            {/* Employee List */}
            <div className="px-6 py-6 space-y-3">
                <h3 className="font-bold text-base mb-4">
                    {filteredEmployees.length} employee(s) found
                </h3>

                {filteredEmployees.map((emp, idx) => (
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

                        <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Check In:</span>
                                <span className="font-medium">{emp.checkIn}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Check Out:</span>
                                <span className="font-medium">{emp.checkOut}</span>
                            </div>
                            <div className="flex justify-between text-sm items-start">
                                <span className="text-text-secondary">Location:</span>
                                <span className="font-medium text-right flex-1 ml-2">{emp.location}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
                            <button
                                onClick={() => handleViewDetails(emp)}
                                className="py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1 text-sm"
                            >
                                <Eye size={16} />
                                <span>View Logs</span>
                            </button>
                            {emp.coordinates && (
                                <button
                                    onClick={() => handleViewOnMap(emp.coordinates)}
                                    className="py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1 text-sm"
                                >
                                    <MapPin size={16} />
                                    <span>Map View</span>
                                </button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Punch Logs Modal */}
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
                                                    onClick={() => handleViewOnMap(log.coords)}
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

export default EmployeeList;
