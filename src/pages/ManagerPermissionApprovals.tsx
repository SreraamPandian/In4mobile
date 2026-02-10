import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, Paperclip } from 'lucide-react';
import Card from '../components/ui/Card';

const ManagerPermissionApprovals = () => {
    const navigate = useNavigate();

    const permissionRequests = [
        { employee: 'John Doe', date: '2026-01-10', timeFrom: '10:00 AM', timeTo: '11:30 AM', duration: '1.5 hours', status: 'Approved', reason: 'Doctor appointment', approvedBy: 'Admin (HR)', attachmentUrl: 'https://example.com/doc.pdf' },
        { employee: 'Jane Smith', date: '2026-01-12', timeFrom: '02:00 PM', timeTo: '03:00 PM', duration: '1 hour', status: 'Approved', reason: 'Bank work', approvedBy: 'Supervisor', attachmentUrl: null },
        { employee: 'Mike Johnson', date: '2026-01-15', timeFrom: '11:00 AM', timeTo: '12:00 PM', duration: '1 hour', status: 'Pending', reason: 'Personal work', approvedBy: null, attachmentUrl: 'https://example.com/letter.pdf' },
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
                <h1 className="text-xl font-bold">Permission Approvals</h1>
            </div>

            <div className="px-6 py-6 space-y-4">
                {permissionRequests.map((permission, idx) => (
                    <Card key={idx}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-base">
                                {permission.status === 'Approved' ? `Approved By: ${permission.approvedBy}` : permission.employee}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${permission.status === 'Approved' ? 'bg-success/10 text-success' :
                                permission.status === 'Rejected' ? 'bg-error/10 text-error' :
                                    'bg-warning/10 text-warning'
                                }`}>
                                {permission.status}
                            </span>
                        </div>
                        <div className="space-y-2 mb-4">
                            {permission.status === 'Approved' && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Employee:</span>
                                    <span className="font-medium">{permission.employee}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Date:</span>
                                <span className="font-medium">{permission.date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Time:</span>
                                <span className="font-medium">{permission.timeFrom} - {permission.timeTo}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Duration:</span>
                                <span className="font-medium text-primary">{permission.duration}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-text-secondary block mb-1">Reason:</span>
                                <p className="font-medium">{permission.reason}</p>
                            </div>
                            {permission.attachmentUrl && (
                                <div className="pt-1">
                                    <a
                                        href={permission.attachmentUrl}
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
                        {permission.status === 'Pending' && (
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                                <button
                                    onClick={() => handleApprove(permission.employee)}
                                    className="py-2 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors flex items-center justify-center space-x-1"
                                >
                                    <CheckCircle size={16} />
                                    <span>Approve</span>
                                </button>
                                <button
                                    onClick={() => handleReject(permission.employee)}
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

export default ManagerPermissionApprovals;
