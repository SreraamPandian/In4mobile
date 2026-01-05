import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';

const ApprovedOTList = () => {
    const navigate = useNavigate();

    const otList = [
        { date: '2026-01-10', employee: 'John Doe', hours: 3, status: 'Approved', approvedBy: 'Manager' },
        { date: '2026-01-08', employee: 'Jane Smith', hours: 2.5, status: 'Approved', approvedBy: 'Manager' },
        { date: '2026-01-05', employee: 'Mike Johnson', hours: 4, status: 'Approved', approvedBy: 'Manager' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Approved OT List</h1>
            </div>

            <div className="px-6 py-6 space-y-4">
                {otList.map((ot, idx) => (
                    <Card key={idx}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <Calendar size={16} className="text-primary" />
                                <span className="font-semibold text-sm">{ot.date}</span>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success flex items-center space-x-1">
                                <CheckCircle size={14} />
                                <span>{ot.status}</span>
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Employee:</span>
                                <span className="font-medium">{ot.employee}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">OT Hours:</span>
                                <span className="font-medium text-primary">{ot.hours} hours</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Approved By:</span>
                                <span className="font-medium">{ot.approvedBy}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ApprovedOTList;
