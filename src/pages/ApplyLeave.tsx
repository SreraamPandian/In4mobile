import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ApplyLeave = () => {
    const navigate = useNavigate();
    const [leaveType, setLeaveType] = useState('casual');
    const [duration, setDuration] = useState('single');
    const [session, setSession] = useState('full');

    return (
        <div className="pb-8">
            {/* Header */}
            <div className="bg-surface px-6 pt-6 pb-4 border-b border-border flex items-center space-x-4 sticky top-0 z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-background rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-text-main" />
                </button>
                <h1 className="text-xl font-bold text-text-main">Apply Leave</h1>
            </div>

            <div className="px-6 pt-6 space-y-6">
                {/* Balance Cards */}
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                    {[
                        { type: 'Casual', count: 12, id: 'casual', color: 'bg-primary/10 text-primary border-primary/20' },
                        { type: 'Sick', count: 5, id: 'sick', color: 'bg-red-50 text-red-700 border-red-200' },
                        { type: 'Earned', count: 3, id: 'earned', color: 'bg-green-50 text-green-700 border-green-200' },
                    ].map((item) => (
                        <motion.button
                            key={item.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLeaveType(item.id)}
                            className={`flex-shrink-0 w-32 p-4 rounded-xl border-2 text-left transition-all ${leaveType === item.id
                                    ? `ring-2 ring-primary ring-offset-2 ${item.color}`
                                    : 'bg-surface border-border text-text-secondary'
                                }`}
                        >
                            <span className="text-xs font-medium opacity-80 block mb-1">{item.type} Leave</span>
                            <span className="text-2xl font-bold">{item.count}</span>
                            <span className="text-[10px] opacity-60 block mt-1">Available</span>
                        </motion.button>
                    ))}
                </div>

                {/* Duration Toggle */}
                <div>
                    <label className="text-sm font-semibold text-text-main mb-3 block">Duration</label>
                    <div className="bg-gray-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setDuration('single')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${duration === 'single' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-secondary'}`}
                        >
                            Single Day
                        </button>
                        <button
                            onClick={() => setDuration('multiple')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${duration === 'multiple' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-secondary'}`}
                        >
                            Multiple Days
                        </button>
                    </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="text-sm font-semibold text-text-main mb-2 block">
                            {duration === 'single' ? 'Select Date' : 'From Date'}
                        </label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                            <input
                                type="date"
                                className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-text-main"
                            />
                        </div>
                    </div>
                    {duration === 'multiple' && (
                        <div>
                            <label className="text-sm font-semibold text-text-main mb-2 block">To Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                                <input
                                    type="date"
                                    className="w-full h-12 pl-12 pr-4 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-text-main"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Session Selection (Only for Single Day) */}
                {duration === 'single' && (
                    <div>
                        <label className="text-sm font-semibold text-text-main mb-3 block">Session</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['First Half', 'Second Half', 'Full Day'].map((s) => {
                                const val = s.toLowerCase().replace(' ', '-');
                                return (
                                    <button
                                        key={val}
                                        onClick={() => setSession(val)}
                                        className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${session === val
                                                ? 'bg-primary/10 border-primary text-primary'
                                                : 'bg-surface border-border text-text-secondary hover:bg-gray-50'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Reason */}
                <div>
                    <label className="text-sm font-semibold text-text-main mb-2 block">Reason</label>
                    <textarea
                        rows={4}
                        placeholder="Please enter reason for leave..."
                        className="w-full p-4 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-text-main resize-none text-sm"
                    ></textarea>
                    <div className="flex justify-end mt-1">
                        <span className="text-xs text-text-muted">0/200 characters</span>
                    </div>
                </div>

                <div className="pt-4">
                    <Button fullWidth size="lg" className="shadow-lg shadow-primary/20">
                        SUBMIT REQUEST
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;
