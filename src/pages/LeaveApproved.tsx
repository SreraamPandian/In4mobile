import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';

const LeaveApproved = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="dark:text-white" />
                </button>
                <h1 className="text-xl font-bold">Leave Approved</h1>
            </div>

            <div className="px-6 py-6">
                <Card className="dark:bg-gray-800">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                            <CheckCircle2 size={32} className="text-success" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Leave Request Approved</h2>
                            <p className="text-sm text-text-muted">2 hours ago</p>
                        </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Leave Type:</span>
                            <span className="text-sm font-medium">Casual Leave</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Duration:</span>
                            <span className="text-sm font-medium">2 days</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">From Date:</span>
                            <span className="text-sm font-medium">Jan 15, 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">To Date:</span>
                            <span className="text-sm font-medium">Jan 16, 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Approved By:</span>
                            <span className="text-sm font-medium">Manager Name</span>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-success/5 rounded-xl">
                        <p className="text-sm text-success font-medium">Your leave request has been approved. Enjoy your time off!</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LeaveApproved;
