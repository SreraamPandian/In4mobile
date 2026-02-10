import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, Paperclip } from 'lucide-react';
import Card from '../components/ui/Card';

const ManagerLeaveApprovals = () => {
    const navigate = useNavigate();

    const leaveRequests = [
        { employee: 'John Doe', leaveType: 'Casual Leave', fromDate: '2026-01-15', toDate: '2026-01-16', days: 2, status: 'Approved', reason: 'Personal work', approvedBy: 'Admin (HR)', attachmentUrl: null },
        { employee: 'Jane Smith', leaveType: 'Sick Leave', fromDate: '2026-01-12', toDate: '2026-01-12', days: 1, status: 'Approved', reason: 'Medical checkup', approvedBy: 'Supervisor', attachmentUrl: 'https://example.com/med.pdf' },
        { employee: 'Mike Johnson', leaveType: 'Earned Leave', fromDate: '2026-01-20', toDate: '2026-01-22', days: 3, status: 'Pending', reason: 'Family function', approvedBy: null, attachmentUrl: 'https://example.com/invitation.pdf' },
    ];

    const handleApprove = (_employee: string) => {
        // Approve logic
    };

    const handleReject = (_employee: string) => {
        // Reject logic
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Leave Approvals</h1>
            </div>

            <div className="px-6 py-6 space-y-4">
                {leaveRequests.map((leave, idx) => (
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
                                    onClick={() => handleApprove(leave.employee)}
                                    className="py-2 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors flex items-center justify-center space-x-1"
                                >
                                    <CheckCircle size={16} />
                                    <span>Approve</span>
                                </button>
                                <button
                                    onClick={() => handleReject(leave.employee)}
                                    className="py-2 bg-error text-white rounded-lg font-semibold hover:bg-error/90 transition-colors flex items-center justify-center space-x-1"
                                >
                                    <X size={16} />
                                    <span>Reject</span>
                                </button>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManagerLeaveApprovals;
