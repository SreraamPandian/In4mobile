import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';

const ApprovedCompOffList = () => {
    const navigate = useNavigate();

    const compOffList = [
        { workedDate: '2025-12-25', requestDate: '2026-01-15', employee: 'John Doe', status: 'Approved', approvedBy: 'Manager' },
        { workedDate: '2025-12-31', requestDate: '2026-01-20', employee: 'Jane Smith', status: 'Approved', approvedBy: 'Manager' },
        { workedDate: '2026-01-01', requestDate: '2026-01-25', employee: 'Mike Johnson', status: 'Approved', approvedBy: 'Manager' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Approved Comp Off List</h1>
            </div>

            <div className="px-6 py-6 space-y-4">
                {compOffList.map((compOff, idx) => (
                    <Card key={idx}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <Calendar size={16} className="text-primary" />
                                <span className="font-semibold text-sm">{compOff.requestDate}</span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success flex items-center space-x-1">
                                <CheckCircle size={14} />
                                <span>{compOff.status}</span>
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Employee:</span>
                                <span className="font-medium">{compOff.employee}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Worked Date:</span>
                                <span className="font-medium">{compOff.workedDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Comp Off Date:</span>
                                <span className="font-medium text-primary">{compOff.requestDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Approved By:</span>
                                <span className="font-medium">{compOff.approvedBy}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ApprovedCompOffList;
