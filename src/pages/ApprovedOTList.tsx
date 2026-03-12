import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, Filter, Clock, User, CalendarDays, Minus, Plus } from 'lucide-react';
import ApprovalFilter from '../components/ApprovalFilter';

const ApprovedOTList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'New' | 'All'>('New');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        status: 'All',
        fromDate: '',
        toDate: ''
    });

    const [otList, setOtList] = useState([
        { employee: 'Robert Wilson', date: '2026-01-10', requestedHours: 3, approvedHours: 3, status: 'Approved', approvedBy: 'Admin (Manager)' },
        { employee: 'Sarah Connor', date: '2026-01-08', requestedHours: 2.5, approvedHours: 2.5, status: 'Approved', approvedBy: 'Supervisor' },
        { employee: 'David Brown', date: '2026-01-05', requestedHours: 4, approvedHours: 4, status: 'Approved', approvedBy: 'John (HR)' },
        { employee: 'Emma Watson', date: '2026-01-15', requestedHours: 3.5, approvedHours: 3.5, status: 'Pending', approvedBy: null },
    ]);

    const [editedHours, setEditedHours] = useState<Record<number, number>>({});

    const filteredOT = otList.filter((req) => {
        if (activeTab === 'New' && req.status !== 'Pending') return false;
        if (filters.search && !req.employee.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (activeTab === 'All' && filters.status !== 'All' && req.status !== filters.status) return false;
        if (filters.fromDate && req.date < filters.fromDate) return false;
        if (filters.toDate && req.date > filters.toDate) return false;
        return true;
    });

    const handleApprove = (realIdx: number) => {
        const hours = editedHours[realIdx] ?? otList[realIdx].requestedHours;
        setOtList(prev => prev.map((item, i) =>
            i === realIdx ? { ...item, status: 'Approved', approvedHours: hours, approvedBy: 'Manager' } : item
        ));
    };

    const handleReject = (realIdx: number) => {
        setOtList(prev => prev.map((item, i) =>
            i === realIdx ? { ...item, status: 'Rejected' } : item
        ));
    };

    const adjustHours = (realIdx: number, delta: number) => {
        const current = editedHours[realIdx] ?? otList[realIdx].requestedHours;
        const next = Math.max(0.5, Math.round((current + delta) * 2) / 2);
        setEditedHours(prev => ({ ...prev, [realIdx]: next }));
    };

    const getInitials = (name: string) =>
        name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const statusStyle: Record<string, { border: string; badge: string }> = {
        Approved: { border: 'border-l-emerald-400', badge: 'bg-emerald-50 text-emerald-600' },
        Rejected: { border: 'border-l-red-400', badge: 'bg-red-50 text-red-500' },
        Pending:  { border: 'border-l-amber-400', badge: 'bg-amber-50 text-amber-600' },
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-border">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold">OT Approvals</h1>
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

                <div className="px-6 pb-3">
                    <div className="bg-gray-100 p-1 rounded-2xl flex">
                        {(['New', 'All'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="px-4 py-5 space-y-3">
                {filteredOT.map((ot, idx) => {
                    const realIdx = otList.indexOf(ot);
                    const style = statusStyle[ot.status] ?? statusStyle.Pending;
                    const currentEditHours = editedHours[realIdx] ?? ot.requestedHours;

                    return (
                        <div
                            key={idx}
                            className={`bg-white rounded-2xl shadow-sm border-l-4 ${style.border} overflow-hidden`}
                        >
                            {/* Card Header */}
                            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-black text-primary">{getInitials(ot.employee)}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{ot.employee}</p>
                                        {ot.approvedBy && (
                                            <p className="text-[11px] text-gray-400">By: {ot.approvedBy}</p>
                                        )}
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${style.badge}`}>
                                    {ot.status}
                                </span>
                            </div>

                            {/* Info Rows */}
                            <div className="px-4 pb-3 space-y-2 border-t border-gray-50 pt-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1.5 text-gray-400">
                                        <CalendarDays size={13} />
                                        <span className="text-xs font-medium">OT Date</span>
                                    </div>
                                    <span className="font-semibold text-gray-700 text-xs">{ot.date}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1.5 text-gray-400">
                                        <Clock size={13} />
                                        <span className="text-xs font-medium">Requested Hours</span>
                                    </div>
                                    <span className="font-semibold text-gray-700 text-xs">{ot.requestedHours} hrs</span>
                                </div>

                                {ot.status === 'Approved' && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1.5 text-emerald-500">
                                            <CheckCircle size={13} />
                                            <span className="text-xs font-medium">Approved Hours</span>
                                        </div>
                                        <span className="font-bold text-emerald-600 text-sm">{ot.approvedHours} hrs</span>
                                    </div>
                                )}

                                {ot.status === 'Rejected' && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1.5 text-red-400">
                                            <User size={13} />
                                            <span className="text-xs font-medium">Status</span>
                                        </div>
                                        <span className="font-bold text-red-500 text-xs">Not Approved</span>
                                    </div>
                                )}
                            </div>

                            {/* Pending Actions */}
                            {ot.status === 'Pending' && (
                                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                                        Adjust Approved Hours
                                    </p>
                                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-3">
                                        <button
                                            onClick={() => adjustHours(realIdx, -0.5)}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                                        >
                                            <Minus size={14} className="text-gray-500" />
                                        </button>
                                        <div className="text-center">
                                            <span className="text-xl font-extrabold text-primary">{currentEditHours}</span>
                                            <span className="text-xs font-semibold text-gray-400 ml-1">hrs</span>
                                        </div>
                                        <button
                                            onClick={() => adjustHours(realIdx, 0.5)}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                                        >
                                            <Plus size={14} className="text-gray-500" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handleApprove(realIdx)}
                                            className="py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                                        >
                                            <CheckCircle size={15} />
                                            <span>Approve</span>
                                        </button>
                                        <button
                                            onClick={() => handleReject(realIdx)}
                                            className="py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                                        >
                                            <X size={15} />
                                            <span>Reject</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredOT.length === 0 && (
                    <div className="py-16 text-center">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter size={24} className="text-gray-400" />
                        </div>
                        <p className="text-text-secondary font-medium">No results found</p>
                    </div>
                )}
            </div>

            <ApprovalFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={setFilters}
                onClear={() => setFilters({ search: '', status: 'All', fromDate: '', toDate: '' })}
            />
        </div>
    );
};

export default ApprovedOTList;
