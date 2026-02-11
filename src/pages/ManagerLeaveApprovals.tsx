import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, Paperclip, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import ApprovalFilter from '../components/ApprovalFilter';
import RemarksModal from '../components/RemarksModal';

const ManagerLeaveApprovals = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'New' | 'All'>('New');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        status: 'All',
        fromDate: '',
        toDate: ''
    });

    // Remarks Modal State
    const [isRemarksOpen, setIsRemarksOpen] = useState(false);
    const [remarksAction, setRemarksAction] = useState<'approve' | 'reject'>('approve');
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    const leaveRequests = [
        { employee: 'John Doe', leaveType: 'Casual Leave', fromDate: '2026-01-15', toDate: '2026-01-16', days: 2, status: 'Approved', reason: 'Personal work', approvedBy: 'Admin (HR)', attachmentUrl: null },
        { employee: 'Jane Smith', leaveType: 'Sick Leave', fromDate: '2026-01-12', toDate: '2026-01-12', days: 1, status: 'Approved', reason: 'Medical checkup', approvedBy: 'Supervisor', attachmentUrl: 'https://example.com/med.pdf' },
        { employee: 'Mike Johnson', leaveType: 'Earned Leave', fromDate: '2026-01-20', toDate: '2026-01-22', days: 3, status: 'Pending', reason: 'Family function', approvedBy: null, attachmentUrl: 'https://example.com/invitation.pdf' },
    ];

    const filteredRequests = leaveRequests.filter(req => {
        // Tab filtering
        if (activeTab === 'New' && req.status !== 'Pending') return false;

        // Search filtering
        if (filters.search && !req.employee.toLowerCase().includes(filters.search.toLowerCase())) return false;

        // Status filtering (only for 'All' tab)
        if (activeTab === 'All' && filters.status !== 'All' && req.status !== filters.status) return false;

        // Date filtering
        if (filters.fromDate && req.fromDate < filters.fromDate) return false;
        if (filters.toDate && req.toDate > filters.toDate) return false;

        return true;
    });

    const handleApproveClick = (request: any) => {
        setSelectedRequest(request);
        setRemarksAction('approve');
        setIsRemarksOpen(true);
    };

    const handleRejectClick = (request: any) => {
        setSelectedRequest(request);
        setRemarksAction('reject');
        setIsRemarksOpen(true);
    };

    const handleRemarksConfirm = (remarks: string) => {
        console.log(`Action: ${remarksAction}, Request for: ${selectedRequest?.employee}, Remarks: ${remarks}`);
        // Here you would typically call an API to update the status
        alert(`Request ${remarksAction === 'approve' ? 'Approved' : 'Rejected'} with remarks: ${remarks}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold">Leave Approvals</h1>
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

                {/* Tabs */}
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
                {filteredRequests.map((leave, idx) => (
                    <Card key={idx}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-base">
                                {leave.status === 'Approved' ? `Approved By: ${leave.approvedBy}` : leave.employee}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${leave.status === 'Approved' ? 'bg-success/10 text-success' :
                                leave.status === 'Rejected' ? 'bg-error/10 text-error' :
                                    'bg-warning/10 text-warning'
                                }`}>
                                {leave.status}
                            </span>
                        </div>
                        <div className="space-y-2 mb-4">
                            {leave.status === 'Approved' && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Employee:</span>
                                    <span className="font-medium">{leave.employee}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Leave Type:</span>
                                <span className="font-medium">{leave.leaveType}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Duration:</span>
                                <span className="font-medium">{leave.fromDate} to {leave.toDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Days:</span>
                                <span className="font-medium text-primary">{leave.days} day(s)</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-text-secondary block mb-1">Reason:</span>
                                <p className="font-medium">{leave.reason}</p>
                            </div>
                            {leave.attachmentUrl && (
                                <div className="pt-1">
                                    <a
                                        href={leave.attachmentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 text-xs font-bold text-primary bg-primary/10 px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors"
                                    >
                                        <Paperclip size={14} />
                                        <span>View Attachment</span>
                                    </a>
                                </div>
                            )}
                        </div>
                        {leave.status === 'Pending' && (
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                                <button
                                    onClick={() => handleApproveClick(leave)}
                                    className="py-2 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors flex items-center justify-center space-x-1"
                                >
                                    <CheckCircle size={16} />
                                    <span>Approve</span>
                                </button>
                                <button
                                    onClick={() => handleRejectClick(leave)}
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

            <RemarksModal
                isOpen={isRemarksOpen}
                onClose={() => setIsRemarksOpen(false)}
                onConfirm={handleRemarksConfirm}
                title={remarksAction === 'approve' ? 'Approve Leave' : 'Reject Leave'}
                actionType={remarksAction}
            />
        </div>
    );
};

export default ManagerLeaveApprovals;
