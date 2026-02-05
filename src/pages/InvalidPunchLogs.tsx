import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';

const InvalidPunchLogs = () => {
    const navigate = useNavigate();

    const invalidLogs = [
        {
            date: '2026-02-01',
            time: '09:00 AM',
            reason: 'Biometric mismatch',
            location: 'Main Gate'
        },
        {
            date: '2026-01-25',
            time: '06:30 PM',
            reason: 'Double punch detected',
            location: 'Office Lobby'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-text-main">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Invalid Punch Logs</h1>
            </div>

            <div className="px-6 py-6 space-y-4">
                {invalidLogs.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        <AlertTriangle size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No invalid punches found.</p>
                    </div>
                ) : (
                    invalidLogs.map((log, idx) => (
                        <Card key={idx} className="border-l-4 border-l-error">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-base text-text-main">{log.date}</h3>
                                    <p className="text-sm font-medium text-text-secondary mt-1">{log.time}</p>
                                </div>
                                <span className="bg-error/10 text-error px-3 py-1 rounded-full text-xs font-bold">
                                    Invalid
                                </span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reason</p>
                                <p className="text-sm font-medium text-text-main">{log.reason}</p>
                                <p className="text-xs text-text-muted mt-2">Location: {log.location}</p>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default InvalidPunchLogs;
