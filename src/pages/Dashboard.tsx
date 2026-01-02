import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Clock, ChevronRight, CheckCircle2, Calendar, FileText, Clock3, Clock9 } from 'lucide-react';
import Card from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="pb-8">
            {/* Sticky Header */}
            <div className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-400 p-[2px]">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Profile"
                            className="w-full h-full rounded-full border-2 border-white object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-text-main leading-none">Hello, Sriram!</h2>
                        <p className="text-xs text-text-secondary mt-1">Product Manager</p>
                    </div>
                </div>
                <button className="relative p-2 text-text-secondary hover:bg-background rounded-full transition-colors">
                    <Bell size={24} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-white"></span>
                </button>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="px-6 pt-6 space-y-6"
            >
                {/* Check-In Card */}
                <motion.div variants={item}>
                    <Card className={`relative overflow-hidden transition-all duration-500 ${isCheckedIn ? 'bg-success/5 border-success/20' : 'bg-primary/5 border-primary/20'}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-sm font-medium text-text-secondary mb-1">
                                    {isCheckedIn ? 'Currently Working' : 'Ready to start?'}
                                </p>
                                <h3 className="text-2xl font-bold text-text-main">
                                    {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                                </h3>
                            </div>
                            <div className={`p-3 rounded-xl ${isCheckedIn ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                                <MapPin size={22} strokeWidth={2.5} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 mb-8">
                            <div>
                                <p className="text-xs text-text-muted mb-1">Time</p>
                                <p className="text-xl font-mono font-semibold text-text-main">09:15 AM</p>
                            </div>
                            <div className="h-8 w-[1px] bg-border"></div>
                            <div>
                                <p className="text-xs text-text-muted mb-1">Location</p>
                                <p className="text-sm font-medium text-text-main flex items-center">
                                    Office HQ
                                </p>
                            </div>
                        </div>

                        {/* Professional Check In and Check Out Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setIsCheckedIn(true)}
                                disabled={isCheckedIn}
                                className={`group relative py-5 px-4 rounded-2xl font-semibold transition-all duration-300 ${isCheckedIn
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 active:scale-[0.98]'
                                    }`}
                            >
                                <div className="flex flex-col items-center space-y-2">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCheckedIn ? 'bg-gray-300' : 'bg-white/20'}`}>
                                        <Clock3 size={24} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-sm">Check In</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setIsCheckedIn(false)}
                                disabled={!isCheckedIn}
                                className={`group relative py-5 px-4 rounded-2xl font-semibold transition-all duration-300 ${!isCheckedIn
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98]'
                                    }`}
                            >
                                <div className="flex flex-col items-center space-y-2">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${!isCheckedIn ? 'bg-gray-300' : 'bg-white/20'}`}>
                                        <Clock9 size={24} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-sm">Check Out</span>
                                </div>
                            </button>
                        </div>
                    </Card>
                </motion.div>

                {/* Today's Summary */}
                <motion.div variants={item}>
                    <h3 className="text-base font-semibold text-text-main mb-3">Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Card
                            className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigate('/attendance')}
                        >
                            <div className="flex items-center space-x-2 mb-2 text-primary">
                                <CheckCircle2 size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Attendance</span>
                            </div>
                            <p className="text-2xl font-bold text-text-main">98%</p>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-primary w-[98%] rounded-full"></div>
                            </div>
                        </Card>
                        <Card
                            className="bg-gradient-to-br from-success/5 to-transparent border-success/10 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigate('/apply-leave')}
                        >
                            <div className="flex items-center space-x-2 mb-2 text-success">
                                <Calendar size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Leaves</span>
                            </div>
                            <p className="text-2xl font-bold text-text-main">12 <span className="text-sm font-normal text-text-muted">days</span></p>
                            <p className="text-xs text-text-secondary mt-1">Remaining balance</p>
                        </Card>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={item} className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-text-main">Recent Activity</h3>
                        <button className="text-xs text-primary font-medium">View All</button>
                    </div>
                    <Card noPadding>
                        {[
                            { title: 'Leave Approved', time: '2 hours ago', type: 'success', icon: CheckCircle2 },
                            { title: 'Permission Requested', time: 'Yesterday', type: 'warning', icon: Clock },
                            { title: 'Payslip Available', time: '2 days ago', type: 'info', icon: FileText },
                        ].map((activity, idx) => (
                            <div key={idx} className="flex items-center p-4 border-b border-border last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.type === 'success' ? 'bg-success/10 text-success' :
                                    activity.type === 'warning' ? 'bg-warning/10 text-warning' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                    <activity.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-text-main">{activity.title}</h4>
                                    <p className="text-xs text-text-muted">{activity.time}</p>
                                </div>
                                <ChevronRight size={16} className="text-text-muted" />
                            </div>
                        ))}
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
