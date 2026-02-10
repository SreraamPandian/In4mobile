import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from './ui/DatePicker';

interface ApprovalFilterProps {
    onApply: (filters: {
        search: string;
        status: string;
        fromDate: string;
        toDate: string;
    }) => void;
    onClear: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const ApprovalFilter: React.FC<ApprovalFilterProps> = ({ onApply, onClear, isOpen, onClose }) => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const statuses = ['All', 'Approved', 'Pending', 'Rejected'];

    const handleApply = () => {
        onApply({ search, status, fromDate, toDate });
        onClose();
    };

    const handleClear = () => {
        setSearch('');
        setStatus('All');
        setFromDate('');
        setToDate('');
        onClear();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[2.5rem] shadow-[0_-8px_40px_rgba(0,0,0,0.1)] p-8 space-y-6 border-t border-gray-100"
                >
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-text-main">Filter</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Search Input */}
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search employee"
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                            />
                        </div>

                        {/* Status Dropdown */}
                        <div className="relative">
                            <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold text-primary z-10">Status</label>
                            <div
                                onClick={() => setIsStatusOpen(!isStatusOpen)}
                                className="w-full bg-white border-2 border-primary rounded-2xl py-4 px-4 flex items-center justify-between cursor-pointer"
                            >
                                <span className="text-sm font-semibold text-text-main">{status}</span>
                                <ChevronDown size={20} className={`text-primary transition-transform duration-300 ${isStatusOpen ? 'rotate-180' : ''}`} />
                            </div>

                            <AnimatePresence>
                                {isStatusOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden"
                                    >
                                        {statuses.map((s) => (
                                            <div
                                                key={s}
                                                onClick={() => {
                                                    setStatus(s);
                                                    setIsStatusOpen(false);
                                                }}
                                                className={`px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${status === s ? 'bg-primary text-white' : 'hover:bg-primary/5 text-text-main'
                                                    }`}
                                            >
                                                {s}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                                <DatePicker
                                    label="From Date"
                                    value={fromDate}
                                    onChange={setFromDate}
                                />
                            </div>
                            <div className="relative">
                                <DatePicker
                                    label="To Date"
                                    value={toDate}
                                    onChange={setToDate}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <button
                            onClick={handleClear}
                            className="py-4 bg-white border-2 border-gray-200 text-text-main rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-[0.98]"
                        >
                            Clear Filter
                        </button>
                        <button
                            onClick={handleApply}
                            className="py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]"
                        >
                            Apply Filter
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ApprovalFilter;
