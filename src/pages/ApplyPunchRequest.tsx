import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, LogIn, LogOut } from 'lucide-react';
import DatePicker from '../components/ui/DatePicker';
import TimePicker from '../components/ui/TimePicker';

const ApplyPunchRequest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        punchType: 'in',
        time: '',
        reason: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Punch request logic
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-white pb-24 font-sans text-text-main">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-text-main" />
                </button>
            </div>

            <div className="px-8 mt-2 max-w-lg mx-auto">
                <h1 className="text-3xl font-light text-text-main leading-tight">
                    Regularize <br />
                    <span className="font-semibold text-primary">Attendance.</span>
                </h1>
                <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                    Missed a punch? <br /> Submit a request to fix your records.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Date Selection */}
                    <div>
                        <DatePicker
                            label="PUNCH DATE"
                            value={formData.date}
                            onChange={(date) => setFormData({ ...formData, date })}
                        />
                    </div>

                    {/* Punch Type Selection */}
                    <div className="bg-gray-50 rounded-2xl p-2 flex relative">
                        {/* Slider Background - Simplified active state logic */}
                        <div className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-spring ${formData.punchType === 'out' ? 'translate-x-full left-2' : 'left-2'}`} />

                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, punchType: 'in' })}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl relative z-10 transition-colors ${formData.punchType === 'in' ? 'text-primary font-bold' : 'text-gray-400 font-medium'}`}
                        >
                            <LogIn size={18} />
                            <span>Punch In</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, punchType: 'out' })}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl relative z-10 transition-colors ${formData.punchType === 'out' ? 'text-primary font-bold' : 'text-gray-400 font-medium'}`}
                        >
                            <LogOut size={18} />
                            <span>Punch Out</span>
                        </button>
                    </div>

                    {/* Time Input */}
                    <div>
                        <TimePicker
                            label="PUNCH TIME"
                            value={formData.time}
                            onChange={(time) => setFormData({ ...formData, time })}
                        />
                    </div>

                    {/* Reason Input */}
                    <div className="bg-gray-50 rounded-2xl p-4 transition-colors hover:bg-gray-100/80 group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-hover:text-gray-500 transition-colors">REASON</label>
                        <div className="flex items-start">
                            <textarea
                                required
                                rows={3}
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full text-base font-medium text-text-main bg-transparent outline-none resize-none placeholder-gray-300 leading-relaxed"
                                placeholder="e.g. Forgot to ID card..."
                            />
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm group-hover:text-primary transition-colors flex-shrink-0 ml-2">
                                <MessageSquare size={18} />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-[0.98] transition-all mt-4"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyPunchRequest;
