import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import Card from '../components/ui/Card';

const PermissionRequested = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="dark:text-white" />
                </button>
                <h1 className="text-xl font-bold">Permission Requested</h1>
            </div>

            <div className="px-6 py-6">
                <Card className="dark:bg-gray-800">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
                            <Clock size={32} className="text-warning" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Permission Request Pending</h2>
                            <p className="text-sm text-text-muted">Yesterday</p>
                        </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Date:</span>
                            <span className="text-sm font-medium">Jan 10, 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Time From:</span>
                            <span className="text-sm font-medium">10:00 AM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Time To:</span>
                            <span className="text-sm font-medium">11:30 AM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Duration:</span>
                            <span className="text-sm font-medium">1.5 hours</span>
                        </div>
                        <div>
                            <span className="text-sm text-text-secondary block mb-2">Reason:</span>
                            <p className="text-sm font-medium">Doctor appointment for routine checkup</p>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-warning/5 rounded-xl">
                        <p className="text-sm text-warning font-medium">Your permission request is pending approval from your manager.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PermissionRequested;
