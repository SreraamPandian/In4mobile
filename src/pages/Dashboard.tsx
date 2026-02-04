import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, CheckCircle2, Calendar, FileText, Sun, Moon, Sunrise, Sunset, LogIn, LogOut } from 'lucide-react';
import Card from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setCheckInTime(time);
        setIsCheckedIn(true);
    };

    const handleCheckOut = () => {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setCheckOutTime(time);
        setIsCheckedIn(false);
    };

    const getTimeIcon = () => {
        const hour = currentTime.getHours();

        if (hour >= 6 && hour < 12) {
            // Sunrise - Soft orange glow
            return (
                <div className="relative">
                    <div className="absolute inset-0 bg-warning/30 blur-md rounded-full"></div>
                    <Sunrise size={24} className="relative text-warning animate-pulse-slow" />
                </div>
            );
        }
        if (hour >= 12 && hour < 17) {
            // Sun - Bright yellow ray effect
            return (
                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-lg rounded-full"></div>
                    <Sun size={24} className="relative text-yellow-500 animate-[spin_10s_linear_infinite]" />
                </div>
            );
        }
        if (hour >= 17 && hour < 20) {
            // Sunset - Deep orange/red
            return (
                <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-full"></div>
                    <Sunset size={24} className="relative text-orange-600" />
                </div>
            );
        }
        // Moon - Cool ethereal glow
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-md rounded-full"></div>
                <Moon size={24} className="relative text-primary fill-primary/20" />
            </div>
        );
    };

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
        <div className="pb-8 bg-gray-50 min-h-screen">
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
                        </div>

                        <div className="flex items-center space-x-6 mb-8">
                            <div>
                                <p className="text-xs text-text-muted mb-1">{currentTime.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-xl font-mono font-semibold text-text-main">
                                        {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    {getTimeIcon()}
                                </div>
                            </div>
                        </div>

                        {/* Circular Check In / Out Buttons */}
                        <div className="flex justify-center items-center mb-6 py-2">
                            {!isCheckedIn ? (
                                <button
                                    onClick={handleCheckIn}
                                    className="group flex flex-col items-center justify-center relative transition-transform active:scale-95"
                                >
                                    {/* Outer soft glow ring */}
                                    <div className="w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center relative">
                                        {/* Middle Ring */}
                                        <div className="absolute w-28 h-28 rounded-full border border-primary/20 flex items-center justify-center"></div>

                                        {/* Inner Circle with Icon */}
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center z-10">
                                            <LogIn size={28} className="text-primary ml-1" />
                                        </div>
                                    </div>

                                    <span className="text-lg font-bold text-primary mt-3">Check In</span>

                                    {checkInTime && <span className="text-xs font-medium text-success absolute -bottom-6">{checkInTime}</span>}
                                </button>
                            ) : (
                                <button
                                    onClick={handleCheckOut}
                                    className="group flex flex-col items-center justify-center relative transition-transform active:scale-95"
                                >
                                    {/* Outer soft glow ring */}
                                    <div className="w-40 h-40 rounded-full bg-red-50 flex items-center justify-center relative">
                                        {/* Middle Ring */}
                                        <div className="absolute w-28 h-28 rounded-full border border-red-200 flex items-center justify-center"></div>

                                        {/* Inner Circle with Icon */}
                                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center z-10">
                                            <LogOut size={28} className="text-red-600 mr-1" />
                                        </div>
                                    </div>

                                    <span className="text-lg font-bold text-red-600 mt-3">Check Out</span>
                                    {checkOutTime && <span className="text-xs font-medium text-error absolute -bottom-6">{checkOutTime}</span>}
                                </button>
                            )}
                        </div>

                        {/* Attendance Details */}
                        {(checkInTime || checkOutTime) && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                <h4 className="font-bold text-sm text-gray-700">Today's Attendance</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {checkInTime && (
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check In</p>
                                            <p className="text-sm font-semibold text-success">{checkInTime}</p>
                                        </div>
                                    )}
                                    {checkOutTime && (
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check Out</p>
                                            <p className="text-sm font-semibold text-error">{checkOutTime}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Card>
                </motion.div>

                {/* Today's Summary */}
                <motion.div variants={item}>
                    <h3 className="text-base font-semibold text-text-main mb-3">Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Card
                            className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
                            onClick={() => navigate('/attendance-calendar')}
                        >
                            <div className="flex items-center space-x-2 mb-2 text-primary">
                                <CheckCircle2 size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Attendance</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-bold text-text-main">98%</p>
                                <div className="w-12 h-12 rounded-full relative" style={{ background: `conic-gradient(var(--card-primary, #6d56a4) 98%, #e5e7eb 0)` }}>
                                    <div className="absolute inset-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-text-muted mt-2">Tap to view calendar</p>
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
                    <Card noPadding className="">
                        {[
                            { title: 'Leave Approved', time: '2 hours ago', type: 'success', icon: CheckCircle2, path: '/leave-approved' },
                            { title: 'Permission Requested', time: 'Yesterday', type: 'warning', icon: Clock, path: '/permission-requested' },
                            { title: 'Payslip Available', time: '2 days ago', type: 'info', icon: FileText, path: '/payslip-available' },
                        ].map((activity, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate(activity.path)}
                                className="flex items-center p-4 border-b border-border last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.type === 'success' ? 'bg-success/10 text-success' :
                                    activity.type === 'warning' ? 'bg-warning/10 text-warning' :
                                        'bg-primary/10 text-primary'
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
