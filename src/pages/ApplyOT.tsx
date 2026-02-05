import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare } from 'lucide-react';
import DatePicker from '../components/ui/DatePicker';

const ApplyOT = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        hours: '',
        reason: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic via API
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
                    Request for <br />
                    <span className="font-semibold text-primary">Overtime.</span>
                </h1>
                <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                    Extra hours worked? <br /> Log your overtime request here.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Date Selection */}
                    <div>
                        <DatePicker
                            label="OVERTIME DATE"
                            value={formData.date}
                            onChange={(date) => setFormData({ ...formData, date })}
                        />
                    </div>

                    {/* Hours Input */}
                    <div className="bg-gray-50 rounded-2xl p-4 transition-colors hover:bg-gray-100/80 group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-hover:text-gray-500 transition-colors">TOTAL HOURS</label>
                        <div className="flex items-center justify-between">
                            <input
                                type="number"
                                required
                                min="0.5"
                                step="0.5"
                                value={formData.hours}
                                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                                className="w-full text-xl font-bold text-text-main bg-transparent outline-none placeholder-gray-300 font-sans tracking-tight"
                                placeholder="0.0"
                            />
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm group-hover:text-primary transition-colors">
                                <Clock size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Reason Input */}
                    <div className="bg-gray-50 rounded-2xl p-4 transition-colors hover:bg-gray-100/80 group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-hover:text-gray-500 transition-colors">WORK DESCRIPTION</label>
                        <div className="flex items-start">
                            <textarea
                                required
                                rows={3}
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full text-base font-medium text-text-main bg-transparent outline-none resize-none placeholder-gray-300 leading-relaxed"
                                placeholder="e.g. Completed urgent deployment..."
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

export default ApplyOT;
