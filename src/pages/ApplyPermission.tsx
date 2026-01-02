import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';

const ApplyPermission = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        timeFrom: '',
        timeTo: '',
        reason: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Permission request submitted!');
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="dark:text-white" />
                </button>
                <h1 className="text-xl font-bold">Apply Permission</h1>
            </div>

            <div className="px-6 py-6">
                <Card className="dark:bg-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">Date</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">Time From</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.timeFrom}
                                    onChange={(e) => setFormData({ ...formData, timeFrom: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">Time To</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.timeTo}
                                    onChange={(e) => setFormData({ ...formData, timeTo: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">Reason</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                                placeholder="Enter reason for permission..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                        >
                            Submit Permission Request
                        </button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ApplyPermission;
