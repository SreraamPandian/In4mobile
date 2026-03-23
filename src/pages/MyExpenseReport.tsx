import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import ReportFilter from '../components/ReportFilter';
import ReportDetailModal from '../components/ReportDetailModal';

const MyExpenseReport = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGenerateReport = (_startDate: string, _endDate: string) => {
        const stored = JSON.parse(localStorage.getItem('expenseClaims') || '[]');
        // Mock data for initial view if none stored
        const mockData = stored.length > 0 ? stored : [
            {
                id: 'EXP001',
                date: '2026-03-15',
                amount: 1500,
                status: 'Approved',
                approvedBy: 'Aravindh Gunasekaran',
                approvedWhen: '2026-03-16 10:30 AM',
                attachmentUrl: 'https://example.com/receipt1.pdf',
                purpose: 'Travel expenses for client meeting in Chennai.',
                appliedOn: '2026-03-15 09:15 AM',
                type: 'Expense Claim',
                approvals: [
                    { name: 'Aravindh Gunasekaran', status: 'approved', remarks: 'Verified and approved.', responseDate: '2026-03-16 10:30 AM' }
                ]
            }
        ];
        setReportData(mockData);
    };

    const handleCardClick = (item: any) => {
        setSelectedItem({
            type: 'Expense Claim',
            status: item.status,
            from: item.date,
            days: `₹${Math.round(item.amount)}`,
            approvedAmount: item.approvedAmount ? `₹${Math.round(item.approvedAmount)}` : null,
            purpose: item.purpose,
            appliedOn: item.appliedOn,
            approvals: item.approvals,
            isExpense: true // Flag for custom labels in ReportDetailModal
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors font-bold">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">My Expense Claim</h1>
            </div>

            <div className="px-6 py-6 space-y-6">
                <ReportFilter onGenerateReport={handleGenerateReport} />

                {reportData.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="font-bold text-base text-text-main">Report Results</h3>
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{reportData.length} Items</span>
                        </div>
                        
                        <div className="space-y-3">
                            {reportData.map((item) => (
                                <button 
                                    key={item.id} 
                                    className="w-full text-left transition-transform active:scale-[0.98]" 
                                    onClick={() => handleCardClick(item)}
                                >
                                    <Card className="hover:border-primary/20 transition-all border-l-4 border-l-primary">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-2">
                                                <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                                    <Calendar size={14} />
                                                </div>
                                                <span className="font-bold text-sm text-text-main">{item.date}</span>
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                item.status === 'Approved' ? 'bg-success/10 text-success' :
                                                item.status === 'Rejected' ? 'bg-error/10 text-error' :
                                                'bg-warning/10 text-warning'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="flex flex-col mb-1">
                                                    <span className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-none mb-1">
                                                        {item.status === 'Approved' ? 'Approved Amount' : 'Requested Amount'}
                                                    </span>
                                                    <span className="text-lg font-black text-primary">₹{Math.round(item.status === 'Approved' ? (item.approvedAmount || item.amount) : item.amount)}</span>
                                                </div>
                                                <p className="text-xs text-text-muted font-medium line-clamp-1">{item.purpose}</p>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3">
                                                <ChevronRight size={18} className="text-gray-300" />
                                            </div>
                                        </div>

                                        {item.status === 'Approved' && item.approvedBy && (
                                            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                                                    Approved by: <span className="text-text-secondary">{item.approvedBy}</span>
                                                </p>
                                                <p className="text-[10px] text-text-muted">{item.approvedWhen}</p>
                                            </div>
                                        )}
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

export default MyExpenseReport;
