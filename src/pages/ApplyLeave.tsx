import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ArrowLeft, ChevronDown, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';

const ApplyLeave = () => {
    const navigate = useNavigate();
    const [leaveType, setLeaveType] = useState('casual');
    const [isOpen, setIsOpen] = useState(false);
    const [duration, setDuration] = useState('single');
    const [session, setSession] = useState('full');
    const [attachment, setAttachment] = useState<File | null>(null);

    const leaveTypes = [
        { id: 'casual', label: 'Casual Leave', balance: 12, color: 'text-primary', bgColor: 'bg-primary/10' },
        { id: 'sick', label: 'Sick Leave', balance: 5, color: 'text-red-600', bgColor: 'bg-red-50' },
        { id: 'earned', label: 'Earned Leave', balance: 3, color: 'text-green-600', bgColor: 'bg-green-50' },
        { id: 'maternity', label: 'Maternity Leave', balance: 90, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        { id: 'paternity', label: 'Paternity Leave', balance: 15, color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { id: 'compoff', label: 'Comp-off', balance: 2, color: 'text-orange-600', bgColor: 'bg-orange-50' },
        { id: 'medical', label: 'Medical Leave', balance: 10, color: 'text-rose-600', bgColor: 'bg-rose-50' },
    ];

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
                {/* Leave Type Custom Dropdown */}
                <div className="relative">
                    <label className="text-sm font-semibold text-text-main mb-2 block">Leave Type</label>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full h-16 px-4 bg-surface border border-border rounded-2xl flex items-center justify-between hover:border-primary/50 transition-all shadow-sm group"
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`p-2.5 rounded-xl transition-colors ${(() => {
                                const type = leaveTypes.find(t => t.id === leaveType) || leaveTypes[0];
                                return type.bgColor;
                            })()}`}>
                                <Briefcase size={20} className={(() => {
                                    const type = leaveTypes.find(t => t.id === leaveType) || leaveTypes[0];
                                    return type.color;
                                })()} />
                            </div>
                            <div className="text-left">
                                <p className="text-[15px] font-bold text-text-main leading-tight">
                                    {(leaveTypes.find(t => t.id === leaveType) || leaveTypes[0]).label}
                                </p>
                                <p className="text-[11px] text-text-muted font-bold mt-0.5 uppercase tracking-wider">
                                    {(leaveTypes.find(t => t.id === leaveType) || leaveTypes[0]).balance} Days Available
                                </p>
                            </div>
                        </div>
                        <ChevronDown
                            size={20}
                            className={`text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isOpen && (
                        <>
                            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="absolute z-40 top-full left-0 right-0 mt-3 bg-white border border-border rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
                            >
                                <div className="p-2 max-h-72 overflow-y-auto scrollbar-hide">
                                    {leaveTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => {
                                                setLeaveType(type.id);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full px-4 py-3.5 flex items-center justify-between rounded-xl transition-all duration-200 mb-1 last:mb-0 ${leaveType === type.id
                                                ? 'bg-primary/10'
                                                : 'hover:bg-gray-50 active:scale-[0.98]'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-2 rounded-lg ${type.bgColor}`}>
                                                    <Briefcase size={16} className={type.color} />
                                                </div>
                                                <span className={`text-sm font-bold ${leaveType === type.id ? 'text-primary' : 'text-text-main'}`}>
                                                    {type.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[10px] font-black text-text-muted bg-gray-100 px-2.5 py-1 rounded-full uppercase">
                                                    {type.balance}d
                                                </span>
                                                {leaveType === type.id && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
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

                {/* File Upload */}
                <div>
                    <FileUpload
                        label="Attach Document (Medical Certificate, etc.)"
                        onFileSelect={(file) => {
                            setAttachment(file);
                            console.log('File attached:', file?.name);
                        }}
                    />
                </div>

                <div className="pt-4 pb-8">
                    <Button fullWidth size="lg" className="shadow-lg shadow-primary/20">
                        SUBMIT REQUEST
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeave;
