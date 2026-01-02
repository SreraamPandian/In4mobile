import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Code, Users, Award } from 'lucide-react';
import Card from '../components/ui/Card';

const AboutApp = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">About App</h1>
            </div>

            <div className="px-6 py-6 space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                        <Smartphone size={40} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-main">ProPeople Mobile</h2>
                    <p className="text-sm text-text-muted mt-1">HR Management System</p>
                    <div className="mt-4 px-4 py-2 bg-primary/10 rounded-full">
                        <p className="text-xs font-medium text-primary">Version 2.4.0 (Build 2024)</p>
                    </div>
                </div>

                <Card>
                    <h3 className="font-bold text-base mb-3">About ProPeople</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        ProPeople is a comprehensive HR management solution designed to streamline employee attendance, leave management, payroll, and more. Our mobile app brings all essential HR functions to your fingertips.
                    </p>
                </Card>

                <div>
                    <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wider mb-3 px-1">Features</h3>
                    <div className="space-y-3">
                        {[
                            { icon: Users, title: 'Attendance Tracking', desc: 'Easy check-in/out with location tracking' },
                            { icon: Code, title: 'Leave Management', desc: 'Apply and track leave requests' },
                            { icon: Award, title: 'Payslip Access', desc: 'View and download monthly payslips' },
                            { icon: Smartphone, title: 'Mobile First', desc: 'Optimized for mobile devices' },
                        ].map((feature, idx) => (
                            <Card key={idx} className="flex items-start space-x-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                    <feature.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                                    <p className="text-xs text-text-muted">{feature.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card>
                    <h3 className="font-bold text-base mb-3">Developer Information</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-text-muted">Company:</span>
                            <span className="font-medium">ProPeople Inc.</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-muted">Website:</span>
                            <span className="font-medium text-primary">www.propeople.com</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-muted">Support:</span>
                            <span className="font-medium">support@propeople.com</span>
                        </div>
                    </div>
                </Card>

                <div className="text-center pt-4 space-y-2">
                    <p className="text-xs text-text-muted">© 2026 ProPeople Inc.</p>
                    <p className="text-xs text-text-muted">All rights reserved</p>
                </div>
            </div>
        </div>
    );
};

export default AboutApp;
