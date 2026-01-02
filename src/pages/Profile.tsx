import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, ChevronRight, Mail, Phone, MapPin, Briefcase, User, Key } from 'lucide-react';
import Card from '../components/ui/Card';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="pb-8">
            {/* Header Profile Section */}
            <div className="bg-surface pb-8 rounded-b-[2.5rem] shadow-soft-sm border-b border-border relative overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary to-primary-light"></div>
                <div className="px-6 relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-400 p-[3px] -mt-12 mb-4">
                        <img
                            src="https://i.pinimg.com/736x/25/d7/5e/25d75ef265bfb76b2f2a5b32fe915b32.jpg"
                            alt="Profile"
                            className="w-full h-full rounded-full border-4 border-white object-cover"
                        />
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-text-main">Sriram</h1>
                            <p className="text-text-secondary font-medium">Product Manager</p>
                            <p className="text-xs text-text-muted mt-1">ID: EMP001</p>
                        </div>
                        <button className="p-2 bg-gray-100 rounded-full text-text-secondary hover:bg-gray-200 transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-6 mt-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Days', value: '365' },
                        { label: 'Present', value: '320' },
                        { label: 'Attendance', value: '98%', textClass: 'text-success' },
                    ].map((stat, idx) => (
                        <Card key={idx} className="flex flex-col items-center justify-center py-4 px-2" noPadding>
                            <span className={`text-lg font-bold ${stat.textClass || 'text-text-main'}`}>{stat.value}</span>
                            <span className="text-[10px] text-text-muted uppercase font-medium mt-1 text-center">{stat.label}</span>
                        </Card>
                    ))}
                </div>

                {/* Info Cards */}
                <Card className="space-y-4">
                    <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-2">Personal Information</h3>
                    <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Mail size={16} />
                        </div>
                        <span className="text-text-secondary">sriram@company.com</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <Phone size={16} />
                        </div>
                        <span className="text-text-secondary">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <MapPin size={16} />
                        </div>
                        <span className="text-text-secondary">Mumbai, India</span>
                    </div>
                </Card>

                <Card className="space-y-4">
                    <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-2">Work Details</h3>
                    <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <Briefcase size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-text-main font-medium">Engineering Dept</span>
                            <span className="text-xs text-text-muted">Full Time</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                            <User size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-text-main font-medium">Reports to Jane Smith</span>
                            <span className="text-xs text-text-muted">Joined Jan 2023</span>
                        </div>
                    </div>
                </Card>

                {/* Change Password Button Only */}
                <button
                    onClick={() => navigate('/change-password')}
                    className="w-full flex items-center justify-between p-4 bg-surface rounded-xl border border-border hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center space-x-3">
                        <Key size={20} className="text-text-secondary" />
                        <span className="text-sm font-medium text-text-main">Change Password</span>
                    </div>
                    <ChevronRight size={18} className="text-text-muted" />
                </button>

                <button
                    onClick={() => navigate('/login')}
                    className="w-full py-4 rounded-xl border border-error/30 text-error font-medium hover:bg-error/5 transition-colors flex items-center justify-center space-x-2"
                >
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>
            </div>
        </div >
    );
};

export default Profile;
