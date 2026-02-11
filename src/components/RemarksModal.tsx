import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import Button from './ui/Button';

interface RemarksModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (remarks: string) => void;
    title: string;
    actionType: 'approve' | 'reject';
}

const RemarksModal: React.FC<RemarksModalProps> = ({ isOpen, onClose, onConfirm, title, actionType }) => {
    const [remarks, setRemarks] = useState('');

    const handleConfirm = () => {
        onConfirm(remarks);
        setRemarks('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-xl ${actionType === 'approve' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                    <MessageSquare size={20} />
                                </div>
                                <h3 className="font-bold text-gray-900">{title}</h3>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-2 block">Remarks</label>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    rows={4}
                                    placeholder={`Enter your remarks for this ${actionType === 'approve' ? 'approval' : 'rejection'}...`}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900 resize-none text-[15px] transition-all"
                                ></textarea>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="w-full h-12 rounded-xl text-gray-500 font-bold border-gray-200"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                className={`w-full h-12 rounded-xl font-bold shadow-lg ${actionType === 'approve'
                                        ? 'bg-success hover:bg-success/90 shadow-success/20'
                                        : 'bg-error hover:bg-error/90 shadow-error/20'
                                    }`}
                            >
                                {actionType === 'approve' ? 'APPROVE' : 'REJECT'}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RemarksModal;
