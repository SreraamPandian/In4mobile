import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, MapPin, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import ApprovalFilter from '../components/ApprovalFilter';

const ManagerPunchApprovals = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'New' | 'All'>('New');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        status: 'All',
        fromDate: '',
        toDate: ''
    });

    const punchRequests = [
        { employee: 'John Doe', date: '2026-01-15', time: '09:05 AM', type: 'Punch In', status: 'Approved', approvedBy: 'Admin (HR)', location: 'Office' },
        { employee: 'Jane Smith', date: '2026-01-15', time: '06:10 PM', type: 'Punch Out', status: 'Approved', approvedBy: 'Supervisor', location: 'Home (Remote)' },
        { employee: 'Mike Johnson', date: '2026-01-20', time: '09:15 AM', type: 'Punch In', status: 'Pending', approvedBy: null, location: 'Client Site' },
    ];

    const filteredRequests = punchRequests.filter(req => {
        if (activeTab === 'New' && req.status !== 'Pending') return false;
        if (filters.search && !req.employee.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (activeTab === 'All' && filters.status !== 'All' && req.status !== filters.status) return false;
        if (filters.fromDate && req.date < filters.fromDate) return false;
        if (filters.toDate && req.date > filters.toDate) return false;
        return true;
    });

    const handleApprove = (_employee: string) => { };
    const handleReject = (_employee: string) => { };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold">Punch Approvals</h1>
                    </div>
                    {activeTab === 'All' && (
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors relative"
                        >
                            <Filter size={20} className="text-gray-600" />
                            {(filters.search || filters.status !== 'All' || filters.fromDate || filters.toDate) && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                            )}
                        </button>
                    )}
                </div>

                <div className="px-6 pb-2">
                    <div className="bg-gray-100 p-1 rounded-2xl flex relative">
                        <button
                            onClick={() => setActiveTab('New')}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all z-10 ${activeTab === 'New' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                        >
                            New
                        </button>
                        <button
                            onClick={() => setActiveTab('All')}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all z-10 ${activeTab === 'All' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                        >
                            All
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-6 py-6 space-y-4">
                {filteredRequests.map((punch, idx) => (
                    <Card key={idx}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-base">
                                {punch.status === 'Approved' ? `Approved By: ${punch.approvedBy}` : punch.employee}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${punch.status === 'Approved' ? 'bg-success/10 text-success' :
                                punch.status === 'Rejected' ? 'bg-error/10 text-error' :
                                    'bg-warning/10 text-warning'
                                }`}>
                                {punch.status}
                            </span>
                        </div>
                        <div className="space-y-2 mb-4">
                            {punch.status === 'Approved' && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Employee:</span>
                                    <span className="font-medium">{punch.employee}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Date:</span>
                                <span className="font-medium">{punch.date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Time:</span>
                                <span className="font-medium">{punch.time}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Type:</span>
                                <span className={`font-bold ${punch.type === 'Punch In' ? 'text-success' : 'text-error'}`}>
                                    {punch.type}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm pt-1">
                                <MapPin size={14} className="text-gray-400" />
                                <span className="text-text-secondary">Location:</span>
                                <span className="font-medium">{punch.location}</span>
                            </div>
                        </div>
                        {punch.status === 'Pending' && (
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                                <button
                                    onClick={() => handleApprove(punch.employee)}
                                    className="py-2 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors flex items-center justify-center space-x-1"
                                >
                                    <CheckCircle size={16} />
                                    <span>Approve</span>
                                </button>
                                <button
                                    onClick={() => handleReject(punch.employee)}
                                    className="py-2 bg-error text-white rounded-lg font-semibold hover:bg-error/90 transition-colors flex items-center justify-center space-x-1"
                                >
                                    <X size={16} />
                                    <span>Reject</span>
                                </button>
                            </div>
                        )}
                    </Card>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter size={24} className="text-gray-400" />
                        </div>
                        <p className="text-text-secondary font-medium">No results found matching your filters</p>
                    </div>
                )}
            </div>

            <ApprovalFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={setFilters}
                onClear={() => setFilters({ search: '', status: 'All', fromDate: '', toDate: '' })}
            />
        </div>
    );
};

export default ManagerPunchApprovals;
