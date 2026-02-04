import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MessageCircle, HelpCircle, Book } from 'lucide-react';
import Card from '../components/ui/Card';

const HelpSupport = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Help & Support</h1>
            </div>

            <div className="px-6 py-6 space-y-6">
                <Card>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                            <HelpCircle size={24} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">We're Here to Help</h2>
                            <p className="text-sm text-text-muted">Get support 24/7</p>
                        </div>
                    </div>
                </Card>

                <div>
                    <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wider mb-3 px-1">Contact Us</h3>
                    <div className="space-y-3">
                        <Card className="flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                <Mail size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-sm">Email Support</h4>
                                <p className="text-xs text-text-muted">support@propeople.com</p>
                            </div>
                        </Card>

                        <Card className="flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                <Phone size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-sm">Phone Support</h4>
                                <p className="text-xs text-text-muted">+1 (800) 123-4567</p>
                            </div>
                        </Card>

                        <Card className="flex items-center space-x-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <MessageCircle size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-sm">Live Chat</h4>
                                <p className="text-xs text-text-muted">Available Mon-Fri, 9AM-6PM</p>
                            </div>
                        </Card>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wider mb-3 px-1">FAQs</h3>
                    <Card className="space-y-4">
                        {[
                            { q: 'How do I check in/out?', a: 'Use the check-in button on the dashboard to mark your attendance.' },
                            { q: 'How do I apply for leave?', a: 'Navigate to the Apply Leave page and fill out the form with your leave details.' },
                            { q: 'Where can I view my payslip?', a: 'Access your payslips from the Payslip tab in the bottom navigation.' },
                            { q: 'How do I change my password?', a: 'Go to Profile > Change Password to update your credentials.' },
                        ].map((faq, idx) => (
                            <div key={idx} className={idx > 0 ? 'pt-4 border-t border-border' : ''}>
                                <div className="flex items-start space-x-2 mb-2">
                                    <Book size={16} className="text-primary mt-0.5" />
                                    <h4 className="font-medium text-sm">{faq.q}</h4>
                                </div>
                                <p className="text-xs text-text-secondary leading-relaxed ml-6">{faq.a}</p>
                            </div>
                        ))}
                    </Card>
                </div>

                <div className="text-center pt-4">
                    <p className="text-xs text-text-muted">Need more help? Contact your HR administrator</p>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;
