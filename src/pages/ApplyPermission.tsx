import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import DatePicker from '../components/ui/DatePicker';
import TimePicker from '../components/ui/TimePicker';
import FileUpload from '../components/ui/FileUpload';

const ApplyPermission = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        timeFrom: '',
        timeTo: '',
        reason: ''
    });
    const [, setAttachment] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Permission request logic
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
                    Request <br />
                    <span className="font-semibold text-primary">Permission.</span>
                </h1>
                <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                    Need a short break? <br /> Apply for hourly permission.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Date Selection */}
                    <div>
                        <DatePicker
                            label="PERMISSION DATE"
                            value={formData.date}
                            onChange={(date) => setFormData({ ...formData, date })}
                        />
                    </div>

                    {/* Time Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <TimePicker
                            label="FROM TIME"
                            value={formData.timeFrom}
                            onChange={(time) => setFormData({ ...formData, timeFrom: time })}
                        />
                        <TimePicker
                            label="TO TIME"
                            value={formData.timeTo}
                            onChange={(time) => setFormData({ ...formData, timeTo: time })}
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
                                placeholder="e.g. Personal work..."
                            />
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm group-hover:text-primary transition-colors flex-shrink-0 ml-2">
                                <MessageSquare size={18} />
                            </div>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <FileUpload
                            label="Attach Document (Optional)"
                            onFileSelect={setAttachment}
                        />
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

export default ApplyPermission;
