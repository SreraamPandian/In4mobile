import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';

const ApprovedPermissionList = () => {
    const navigate = useNavigate();

    const permissionList = [
        { employee: 'John Doe', date: '2026-01-10', timeFrom: '10:00 AM', timeTo: '11:30 AM', duration: '1.5 hours', status: 'Approved', reason: 'Doctor appointment' },
        { employee: 'Jane Smith', date: '2026-01-12', timeFrom: '02:00 PM', timeTo: '03:00 PM', duration: '1 hour', status: 'Approved', reason: 'Bank work' },
        { employee: 'Mike Johnson', date: '2026-01-15', timeFrom: '11:00 AM', timeTo: '12:00 PM', duration: '1 hour', status: 'Approved', reason: 'Personal work' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Approved Permissions</h1>
            </div>

            <div className="px-6 py-6 space-y-4">
                {permissionList.map((permission, idx) => (
                    <Card key={idx}>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-base">{permission.employee}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success flex items-center space-x-1">
                                <CheckCircle size={14} />
                                <span>{permission.status}</span>
                            </span>
                        </div>
                        <div className="space-y-2 mb-4">
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
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ApprovedPermissionList;
