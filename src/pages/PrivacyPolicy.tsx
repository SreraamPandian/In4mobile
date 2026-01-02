import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import Card from '../components/ui/Card';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Privacy Policy</h1>
            </div>

            <div className="px-6 py-6 space-y-6">
                <Card>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Your Privacy Matters</h2>
                            <p className="text-sm text-text-muted">Last updated: January 2026</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-base mb-3 flex items-center space-x-2">
                        <Lock size={18} className="text-primary" />
                        <span>Data Collection</span>
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">
                        We collect only essential information required for HR management purposes, including your name, email, employee ID, attendance records, and leave requests.
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        All data is encrypted and stored securely on our servers with industry-standard security protocols.
                    </p>
                </Card>

                <Card>
                    <h3 className="font-bold text-base mb-3 flex items-center space-x-2">
                        <Eye size={18} className="text-primary" />
                        <span>How We Use Your Data</span>
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                        <li className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Track attendance and working hours</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Process leave requests and approvals</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Generate payslips and reports</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Improve app performance and user experience</span>
                        </li>
                    </ul>
                </Card>

                <Card>
                    <h3 className="font-bold text-base mb-3 flex items-center space-x-2">
                        <FileText size={18} className="text-primary" />
                        <span>Your Rights</span>
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        You have the right to access, modify, or delete your personal data at any time. Contact your HR administrator or reach out to our support team for assistance.
                    </p>
                </Card>

                <div className="text-center pt-4">
                    <p className="text-xs text-text-muted">© 2026 ProPeople Inc. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
