import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Paperclip } from 'lucide-react';
import Card from '../components/ui/Card';
import ReportFilter from '../components/ReportFilter';
import ReportDetailModal from '../components/ReportDetailModal';

const MyLeaveReport = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGenerateReport = (_startDate: string, _endDate: string) => {
        // Mock data - in real app, fetch from API
        const mockData = [
            {
                date: '2026-02-04',
                type: 'Paid Leave',
                days: 0.5,
                status: 'Approved',
                approvedBy: 'Aravindh Gunasekaran',
                attachmentUrl: 'https://example.com/medical_cert.pdf',
                purpose: 'Leave requested for temple visit.',
                appliedOn: '2026-02-02 08:48:17',
                approvals: [
                    { name: 'Aravindh Gunasekaran', status: 'approved', remarks: 'Ok', responseDate: '2026-02-02 08:50:15' },
                    { name: 'Kamal', status: 'pending', remarks: '--' },
                    { name: 'Basker', status: 'pending', remarks: '--' },
                    { name: 'Naveen Subramanian', status: 'pending', remarks: '--' }
                ]
            },
            {
                date: '2026-01-15',
                type: 'Casual Leave',
                days: 1,
                status: 'Approved',
                approvedBy: 'Supervisor',
                attachmentUrl: null,
                purpose: 'Family function.',
                appliedOn: '2026-01-12 10:20:00',
                approvals: [
                    { name: 'Aravindh Gunasekaran', status: 'approved', remarks: 'Enjoy', responseDate: '2026-01-13 09:00:00' }
                ]
            }
        ];
        setReportData(mockData);
    };

    const handleCardClick = (item: any) => {
        setSelectedItem({
            type: item.type,
            status: item.status,
            from: item.date,
            days: item.days,
            purpose: item.purpose,
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
                <h1 className="text-xl font-bold">My Leave Report</h1>
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
                                                <Calendar size={16} className="text-primary" />
                                                <span className="font-semibold text-sm">{item.date}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Approved' ? 'bg-success/10 text-success' :
                                                item.status === 'Rejected' ? 'bg-error/10 text-error' :
                                                    'bg-warning/10 text-warning'
                                                }`}>{item.status}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm text-text-secondary">{item.type} - {item.days} day(s)</p>
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

                                            {item.status === 'Approved' && item.approvedBy && (
                                                <p className="text-xs font-medium text-text-muted italic">
                                                    Approved by: <span className="text-text-secondary">{item.approvedBy}</span>
                                                </p>
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

export default MyLeaveReport;
