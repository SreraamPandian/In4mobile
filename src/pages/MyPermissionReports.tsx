import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Paperclip } from 'lucide-react';
import Card from '../components/ui/Card';
import ReportFilter from '../components/ReportFilter';
import ReportDetailModal from '../components/ReportDetailModal';

const MyPermissionReports = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGenerateReport = (_startDate: string, _endDate: string) => {
        const mockData = [
            {
                date: '2026-02-10',
                time: '10:00 AM - 11:30 AM',
                reason: 'Doctor appointment',
                status: 'Approved',
                approvedBy: 'Admin (Manager)',
                attachmentUrl: 'https://example.com/doc.pdf',
                appliedOn: '2026-02-09 09:15:22',
                approvals: [
                    { name: 'Admin (Manager)', status: 'approved', remarks: 'Approved', responseDate: '2026-02-09 10:30:00' },
                    { name: 'Dept Head', status: 'pending', remarks: '--' }
                ]
            },
            {
                date: '2025-12-15',
                time: '02:00 PM - 03:00 PM',
                reason: 'Personal work',
                status: 'Pending',
                approvedBy: null,
                attachmentUrl: null,
                appliedOn: '2025-12-14 16:00:00',
                approvals: [
                    { name: 'Supervisor', status: 'pending', remarks: '--' }
                ]
            },
        ];
        setReportData(mockData);
    };

    const handleCardClick = (item: any) => {
        setSelectedItem({
            type: 'Permission',
            status: item.status,
            from: item.date,
            time: item.time,
            purpose: item.reason,
            appliedOn: item.appliedOn,
            approvals: item.approvals
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="dark:text-white" />
                </button>
                <h1 className="text-xl font-bold">My Permission Reports</h1>
            </div>

            <div className="px-6 py-6 space-y-6">
                <ReportFilter onGenerateReport={handleGenerateReport} />

                {reportData.length > 0 && (
                    <div>
                        <h3 className="font-bold text-base mb-3">Report Results</h3>
                        <div className="space-y-3">
                            {reportData.map((item, idx) => (
                                <button key={idx} className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-2xl group" onClick={() => handleCardClick(item)}>
                                    <Card className="dark:bg-gray-800 group-hover:border-primary/30 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <Calendar size={16} className="text-primary/70" />
                                                <span className="font-semibold text-sm">{item.date}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Approved' ? 'bg-success/10 text-success' :
                                                item.status === 'Rejected' ? 'bg-error/10 text-error' :
                                                    'bg-warning/10 text-warning'
                                                }`}>{item.status}</span>
                                        </div>
                                        <p className="text-sm text-text-secondary mb-1">{item.time}</p>
                                        <p className="text-sm text-text-main mb-2">{item.reason}</p>

                                        <div className="flex justify-between items-center">
                                            {item.status === 'Approved' && item.approvedBy ? (
                                                <p className="text-xs font-medium text-text-muted italic">
                                                    Approved by: <span className="text-text-secondary">{item.approvedBy}</span>
                                                </p>
                                            ) : <div />}

                                            {item.attachmentUrl && (
                                                <a
                                                    href={item.attachmentUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center space-x-1 text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg hover:bg-primary/20 transition-colors"
                                                >
                                                    <Paperclip size={12} />
                                                    <span>VIEW FILE</span>
                                                </a>
                                            )}
                                        </div>
                                    </Card>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ReportDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedItem}
            />
        </div>
    );
};

export default MyPermissionReports;
