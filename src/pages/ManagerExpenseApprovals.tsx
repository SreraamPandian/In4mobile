import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, Paperclip, Filter, Calendar, User } from 'lucide-react';
import Card from '../components/ui/Card';
import ApprovalFilter from '../components/ApprovalFilter';
import ExpenseRemarksModal from '../components/ExpenseRemarksModal';
import ReportDetailModal from '../components/ReportDetailModal';

const ManagerExpenseApprovals = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'New' | 'All'>('New');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        status: 'All',
        fromDate: '',
        toDate: ''
    });

    const [isRemarksOpen, setIsRemarksOpen] = useState(false);
    const [remarksAction, setRemarksAction] = useState<'approve' | 'reject'>('approve');
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    
    // Detail Modal State
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [detailData, setDetailData] = useState<any>(null);

    const getExpenseRequests = () => {
        const stored = JSON.parse(localStorage.getItem('expenseClaims') || '[]');
        const mockData = [
            { id: 'EXP-101', employee: 'Mike Johnson', amount: 1250, date: '2026-03-20', status: 'Pending', purpose: 'Client lunch and travel', approvedBy: null, approvedAmount: null, attachmentUrl: 'https://example.com/mike_receipt.pdf' },
            { id: 'EXP-102', employee: 'Sarah Wilson', amount: 450, date: '2026-03-18', status: 'Approved', purpose: 'Internet reimbursement', approvedBy: 'Admin (HR)', approvedAmount: 450, attachmentUrl: null },
        ];
        
        // Merge stored claims that are not already in mockData (by ID)
        const allClaims = [...stored];
        mockData.forEach(mock => {
            if (!allClaims.find(c => c.id === mock.id)) {
                allClaims.push(mock);
            }
        });
        return allClaims;
    };

    const expenseRequests = getExpenseRequests();

    const filteredRequests = expenseRequests.filter(req => {
        if (activeTab === 'New' && req.status !== 'Pending') return false;
        if (filters.search && !req.employee?.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (activeTab === 'All' && filters.status !== 'All' && req.status !== filters.status) return false;
        if (filters.fromDate && req.date < filters.fromDate) return false;
        if (filters.toDate && req.date > filters.toDate) return false;
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

    const handleRemarksConfirm = (remarks: string, approvedAmount: number) => {
        console.log({
            action: remarksAction,
            requestId: selectedRequest?.id,
            employee: selectedRequest?.employee,
            remarks,
            approvedAmount
        });
        
        // Update localStorage
        const stored = JSON.parse(localStorage.getItem('expenseClaims') || '[]');
        const updated = stored.map((c: any) => {
            if (c.id === selectedRequest.id) {
                return {
                    ...c,
                    status: remarksAction === 'approve' ? 'Approved' : 'Rejected',
                    approvedBy: 'Current Manager',
                    approvedWhen: new Date().toLocaleString(),
                    approvedAmount: Math.round(approvedAmount),
                    approvals: [
                        { name: 'Current Manager', status: remarksAction === 'approve' ? 'approved' : 'rejected', remarks, responseDate: new Date().toLocaleString() }
                    ]
                };
            }
            return c;
        });
        localStorage.setItem('expenseClaims', JSON.stringify(updated));

        alert(`Request ${remarksAction === 'approve' ? 'Approved' : 'Rejected'}. Approved Amount: ₹${Math.round(approvedAmount)}`);
        window.location.reload();
    };

    const handleCardClick = (expense: any) => {
        setDetailData({
            type: 'Expense Claim',
            status: expense.status,
            from: expense.date,
            days: `₹${Math.round(expense.amount)}`,
            approvedAmount: expense.approvedAmount ? `₹${Math.round(expense.approvedAmount)}` : null,
            purpose: expense.purpose,
            appliedOn: expense.appliedOn || expense.date,
            approvals: expense.approvals || [],
            isExpense: true
        });
        setIsDetailOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors font-bold">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold">Expense Approvals</h1>
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
                {filteredRequests.map((expense) => (
                    <Card key={expense.id} className="border-l-4 border-l-primary/30 cursor-pointer active:scale-[0.98] transition-transform" onClick={() => handleCardClick(expense)}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-text-main line-clamp-1">{expense.employee || 'Demo Employee'}</h3>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{expense.id}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                expense.status === 'Approved' ? 'bg-success/10 text-success' :
                                expense.status === 'Rejected' ? 'bg-error/10 text-error' :
                                'bg-warning/10 text-warning'
                            }`}>
                                {expense.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">Requested</p>
                                <div className="flex items-center text-text-main font-black">
                                    <span className="text-base">₹{Math.round(expense.amount)}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">Date</p>
                                <div className="flex items-center text-text-main font-bold">
                                    <Calendar size={14} className="mr-1.5 text-primary" strokeWidth={2.5} />
                                    <span className="text-xs">{expense.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="text-sm">
                                <span className="text-[10px] text-text-muted font-black uppercase tracking-widest block mb-1">Purpose</span>
                                <p className="font-semibold text-text-secondary text-xs leading-relaxed">{expense.purpose}</p>
                            </div>
                            
                            {(expense.attachmentUrl || expense.attachmentName) && (
                                <div className="pt-1">
                                    <a
                                        href={expense.attachmentUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-2 rounded-xl hover:bg-primary/20 transition-colors"
                                    >
                                        <Paperclip size={14} />
                                        <span>Download</span>
                                    </a>
                                </div>
                            )}

                            {expense.status !== 'Pending' && expense.approvedBy && (
                                <div className="pt-3 border-t border-gray-50 mt-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-wider">
                                        <span>Handled By: <span className="text-text-secondary">{expense.approvedBy}</span></span>
                                        {expense.approvedAmount !== null && (
                                            <span className="text-success font-black">Approved: ₹{Math.round(expense.approvedAmount)}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {expense.status === 'Pending' && (
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border mt-2">
                                <button
                                    onClick={() => handleApproveClick(expense)}
                                    className="py-3 bg-success text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-success/90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-success/20 active:scale-95"
                                >
                                    <CheckCircle size={16} />
                                    <span>Approve</span>
                                </button>
                                <button
                                    onClick={() => handleRejectClick(expense)}
                                    className="py-3 bg-error text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-error/90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-error/20 active:scale-95"
                                >
                                    <X size={16} />
                                    <span>Reject</span>
                                </button>
                            </div>
                        )}
                    </Card>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shrink-0">
                            <Filter size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-text-main mb-1">No requests found</h3>
                        <p className="text-sm text-text-muted">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </div>

            <ApprovalFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={setFilters}
                onClear={() => setFilters({ search: '', status: 'All', fromDate: '', toDate: '' })}
            />

            <ReportDetailModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                data={detailData}
            />

            <ExpenseRemarksModal
                isOpen={isRemarksOpen}
                onClose={() => setIsRemarksOpen(false)}
                onConfirm={handleRemarksConfirm}
                title={remarksAction === 'approve' ? 'Approve Expense' : 'Reject Expense'}
                actionType={remarksAction}
                initialAmount={selectedRequest?.amount}
            />
        </div>
    );
};

export default ManagerExpenseApprovals;
