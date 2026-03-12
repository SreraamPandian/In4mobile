import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, X, Filter, Clock, User, CalendarDays, Minus, Plus, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import ApprovalFilter from '../components/ApprovalFilter';

type OTItem = {
    employee: string;
    date: string;
    requestedHours: number;
    approvedHours: number;
    status: string;
    approvedBy: string | null;
    remarks: string;
};

type ModalState = {
    open: boolean;
    type: 'approve' | 'reject' | null;
    realIdx: number | null;
};

const ApprovedOTList = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'New' | 'All'>('New');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ search: '', status: 'All', fromDate: '', toDate: '' });

    const [otList, setOtList] = useState<OTItem[]>([
        { employee: 'Robert Wilson', date: '2026-01-10', requestedHours: 3, approvedHours: 3, status: 'Approved', approvedBy: 'Admin (Manager)', remarks: 'Project deadline extended.' },
        { employee: 'Sarah Connor', date: '2026-01-08', requestedHours: 2.5, approvedHours: 2.5, status: 'Approved', approvedBy: 'Supervisor', remarks: 'Client deliverable.' },
        { employee: 'David Brown', date: '2026-01-05', requestedHours: 4, approvedHours: 4, status: 'Approved', approvedBy: 'John (HR)', remarks: '' },
        { employee: 'Emma Watson', date: '2026-01-15', requestedHours: 3.5, approvedHours: 3.5, status: 'Pending', approvedBy: null, remarks: '' },
    ]);

    // Modal state
    const [modal, setModal] = useState<ModalState>({ open: false, type: null, realIdx: null });
    const [modalHours, setModalHours] = useState(0);
    const [modalRemarks, setModalRemarks] = useState('');

    const openModal = (type: 'approve' | 'reject', realIdx: number) => {
        setModal({ open: true, type, realIdx });
        setModalHours(otList[realIdx].requestedHours);
        setModalRemarks('');
    };

    const closeModal = () => {
        setModal({ open: false, type: null, realIdx: null });
        setModalRemarks('');
    };

    const adjustModalHours = (delta: number) => {
        setModalHours(prev => Math.max(0.5, Math.round((prev + delta) * 2) / 2));
    };

    const handleSubmit = () => {
        if (modal.realIdx === null) return;
        const idx = modal.realIdx;

        if (modal.type === 'approve') {
            setOtList(prev => prev.map((item, i) =>
                i === idx
                    ? { ...item, status: 'Approved', approvedHours: modalHours, approvedBy: 'Manager', remarks: modalRemarks }
                    : item
            ));
        } else {
            setOtList(prev => prev.map((item, i) =>
                i === idx
                    ? { ...item, status: 'Rejected', approvedBy: 'Manager', remarks: modalRemarks }
                    : item
            ));
        }
        closeModal();
    };

    const filteredOT = otList.filter((req) => {
        if (activeTab === 'New' && req.status !== 'Pending') return false;
        if (filters.search && !req.employee.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (activeTab === 'All' && filters.status !== 'All' && req.status !== filters.status) return false;
        if (filters.fromDate && req.date < filters.fromDate) return false;
        if (filters.toDate && req.date > filters.toDate) return false;
        return true;
    });

    const getInitials = (name: string) =>
        name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const statusStyle: Record<string, { border: string; badge: string }> = {
        Approved: { border: 'border-l-emerald-400', badge: 'bg-emerald-50 text-emerald-600' },
        Rejected:  { border: 'border-l-red-400',     badge: 'bg-red-50 text-red-500' },
        Pending:   { border: 'border-l-amber-400',   badge: 'bg-amber-50 text-amber-600' },
    };

    const isApprove = modal.type === 'approve';

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
                        <button onClick={() => setIsFilterOpen(true)} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors relative">
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

                    return (
                        <div key={idx} className={`bg-white rounded-2xl shadow-sm border-l-4 ${style.border} overflow-hidden`}>
                            {/* Card Header */}
                            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-black text-primary">{getInitials(ot.employee)}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{ot.employee}</p>
                                        {ot.approvedBy && <p className="text-[11px] text-gray-400">By: {ot.approvedBy}</p>}
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${style.badge}`}>{ot.status}</span>
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

                                {/* Remarks shown in All tab */}
                                {ot.remarks && (
                                    <div className="flex items-start space-x-1.5 pt-1">
                                        <MessageSquare size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-gray-500 italic">"{ot.remarks}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Pending Action Buttons */}
                            {ot.status === 'Pending' && (
                                <div className="px-4 pb-4 pt-2 border-t border-gray-100 grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => openModal('approve', realIdx)}
                                        className="py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                                    >
                                        <CheckCircle size={15} />
                                        <span>Approve</span>
                                    </button>
                                    <button
                                        onClick={() => openModal('reject', realIdx)}
                                        className="py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                                    >
                                        <X size={15} />
                                        <span>Reject</span>
                                    </button>
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

            {/* Approve / Reject Modal */}
            {modal.open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.93 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.93 }}
                        className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className={`px-5 py-4 flex items-center justify-between ${isApprove ? 'bg-emerald-50 border-b border-emerald-100' : 'bg-red-50 border-b border-red-100'}`}>
                            <div className="flex items-center space-x-2">
                                {isApprove
                                    ? <CheckCircle size={18} className="text-emerald-500" />
                                    : <X size={18} className="text-red-500" />
                                }
                                <h3 className={`font-bold text-sm ${isApprove ? 'text-emerald-700' : 'text-red-600'}`}>
                                    {isApprove ? 'Approve OT Request' : 'Reject OT Request'}
                                </h3>
                            </div>
                            <button onClick={closeModal} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                                <X size={16} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="px-5 py-4 space-y-4">
                            {/* Employee info summary */}
                            {modal.realIdx !== null && (
                                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-[11px] font-black text-primary">{getInitials(otList[modal.realIdx].employee)}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{otList[modal.realIdx].employee}</p>
                                        <p className="text-[11px] text-gray-400">{otList[modal.realIdx].date} · Requested: {otList[modal.realIdx].requestedHours} hrs</p>
                                    </div>
                                </div>
                            )}

                            {/* OT Hours Stepper — only for approve */}
                            {isApprove && (
                                <div>
                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Approved OT Hours</p>
                                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                                        <button
                                            onClick={() => adjustModalHours(-0.5)}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                                        >
                                            <Minus size={14} className="text-gray-500" />
                                        </button>
                                        <div className="text-center">
                                            <span className="text-2xl font-extrabold text-primary">{modalHours}</span>
                                            <span className="text-xs font-semibold text-gray-400 ml-1">hrs</span>
                                        </div>
                                        <button
                                            onClick={() => adjustModalHours(0.5)}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                                        >
                                            <Plus size={14} className="text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Remarks */}
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">Remarks</p>
                                <textarea
                                    value={modalRemarks}
                                    onChange={e => setModalRemarks(e.target.value.slice(0, 80))}
                                    rows={3}
                                    placeholder="Enter remarks..."
                                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                                <p className="text-[10px] text-gray-400 text-right mt-0.5">{modalRemarks.length}/80</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                            <button
                                onClick={closeModal}
                                className="py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={`py-2.5 rounded-xl text-white font-bold text-sm transition-colors shadow-sm ${isApprove ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}`}
                            >
                                {isApprove ? 'Approve' : 'Reject'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ApprovedOTList;
