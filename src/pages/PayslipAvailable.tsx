import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import Card from '../components/ui/Card';

const PayslipAvailable = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="dark:text-white" />
                </button>
                <h1 className="text-xl font-bold">Payslip Available</h1>
            </div>

            <div className="px-6 py-6">
                <Card className="dark:bg-gray-800">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                            <FileText size={32} className="text-blue-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Payslip for December 2025</h2>
                            <p className="text-sm text-text-muted">2 days ago</p>
                        </div>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Month:</span>
                            <span className="text-sm font-medium">December 2025</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Net Salary:</span>
                            <span className="text-lg font-bold text-success">₹85,000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Payment Date:</span>
                            <span className="text-sm font-medium">Jan 01, 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-text-secondary">Status:</span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">Paid</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            onClick={() => navigate('/payslip')}
                            className="py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
                        >
                            <FileText size={18} />
                            <span>View Details</span>
                        </button>
                        <button className="py-3 bg-gray-100 text-text-main rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                            <Download size={18} />
                            <span>Download</span>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PayslipAvailable;
