import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';

const MyAvailableLeave = () => {
    const navigate = useNavigate();

    const leaveTypes = [
        { type: 'Casual Leave', available: 8, total: 12, used: 4, color: 'bg-primary' },
        { type: 'Sick Leave', available: 5, total: 10, used: 5, color: 'bg-red-500' },
        { type: 'Earned Leave', available: 15, total: 20, used: 5, color: 'bg-green-500' },
        { type: 'Comp Off', available: 2, total: 5, used: 3, color: 'bg-purple-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="dark:text-white" />
                </button>
                <h1 className="text-xl font-bold">My Available Leave</h1>
            </div>

            <div className="px-6 py-6 space-y-4">
                {leaveTypes.map((leave, idx) => (
                    <Card key={idx} className="dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <Calendar size={18} className="text-primary" />
                                <h3 className="font-bold text-base">{leave.type}</h3>
                            </div>
                            <span className="text-2xl font-bold text-primary">{leave.available}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
                            <span>Available</span>
                            <span>{leave.used} used of {leave.total} total</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${leave.color} transition-all`}
                                style={{ width: `${(leave.available / leave.total) * 100}%` }}
                            ></div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MyAvailableLeave;
