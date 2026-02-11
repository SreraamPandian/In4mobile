import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, CheckCircle2, Circle } from 'lucide-react';

interface ManagerApproval {
    name: string;
    status: 'approved' | 'pending' | 'rejected';
    remarks: string;
    responseDate?: string;
}

interface ReportDetail {
    type: string;
    status: string;
    from: string;
    to?: string;
    days?: number | string;
    time?: string;
    purpose: string;
    appliedOn: string;
    approvals: ManagerApproval[];
}

interface ReportDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ReportDetail | null;
}

const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ isOpen, onClose, data }) => {
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
                    >
                        {/* Pull Handle for Mobile */}
                        <div className="sm:hidden w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />

                        {/* Header */}
                        <div className="px-8 pt-4 pb-2 flex justify-between items-center sm:pt-8">
                            <h2 className="text-xl font-black text-text-main tracking-tight">Report Details</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-muted"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto px-8 pb-12 scrollbar-hide space-y-8">

                            {/* Request Info Section */}
                            <div className="space-y-4 pt-4">
                                <DetailRow label="Leave Type" value={data.type} />
                                <DetailRow
                                    label="Status"
                                    value={data.status}
                                    valueClassName={data.status.toLowerCase() === 'approved' ? 'text-success' : data.status.toLowerCase() === 'rejected' ? 'text-error' : 'text-warning'}
                                />
                                <DetailRow label={data.time ? "Date" : "Leave From"} value={data.from} />
                                {data.to && <DetailRow label="Leave To" value={data.to} />}
                                {data.days && <DetailRow label="No Of Days" value={data.days} />}
                                {data.time && <DetailRow label="Time Slot" value={data.time} />}
                                <DetailRow label="Purpose" value={data.purpose} className="items-start" />
                                <DetailRow label="Applied On" value={data.appliedOn} />
                            </div>

                            <div className="h-px bg-gray-100 mx-[-2rem]" />

                            {/* Manager Approvals Section */}
                            <div className="space-y-6">
                                {data.approvals.map((approval, index) => (
                                    <div key={index} className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-[14px] font-black text-text-main uppercase tracking-widest opacity-60">Manager Approval</p>
                                        </div>
                                        <div className="space-y-3 pl-1">
                                            <DetailRow label="Name" value={approval.name} />
                                            <DetailRow
                                                label="Status"
                                                value={approval.status}
                                                valueClassName={approval.status === 'approved' ? 'text-success' : approval.status === 'rejected' ? 'text-error' : 'text-warning'}
                                            />
                                            <DetailRow label="Remarks" value={approval.remarks} />
                                            {approval.responseDate && (
                                                <DetailRow label="Response Date" value={approval.responseDate} />
                                            )}
                                        </div>
                                        {index < data.approvals.length - 1 && (
                                            <div className="h-px bg-gray-50 mt-6" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const DetailRow = ({ label, value, className = "", valueClassName = "" }: { label: string; value: string | number; className?: string; valueClassName?: string }) => (
    <div className={`flex items-baseline space-x-4 ${className}`}>
        <p className="w-28 text-[13px] font-bold text-text-muted shrink-0 capitalize tracking-tight leading-relaxed">{label}</p>
        <p className="text-[13px] font-bold text-text-muted shrink-0">:</p>
        <p className={`text-[14px] font-bold text-text-main leading-relaxed ${valueClassName}`}>{value}</p>
    </div>
);

export default ReportDetailModal;
