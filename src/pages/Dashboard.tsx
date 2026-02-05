import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, CheckCircle2, Calendar, FileText, LogIn, LogOut, X } from 'lucide-react';
import Card from '../components/ui/Card';
import TimeThemeIcon from '../components/ui/TimeThemeIcon';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showPunchRequestModal, setShowPunchRequestModal] = useState(false);
    const [punchType, setPunchType] = useState('Check In');

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
                    <Card className="relative overflow-hidden transition-all duration-500 bg-white border-border">
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
                                    <TimeThemeIcon hour={currentTime.getHours()} />
                                </div>
                            </div>
                        </div>

                        {/* Circular Check In / Out Buttons */}
                        <div className="flex justify-center items-center mb-4 py-2">
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

                        {/* Forgot to Check In Link */}
                        <div className="text-center mb-6">
                            <button
                                onClick={() => setShowPunchRequestModal(true)}
                                className="flex items-center justify-center space-x-2 mx-auto text-primary hover:text-primary-dark transition-colors"
                            >
                                <span className="text-sm font-medium">Forgot to check in?</span>
                                <div className="p-1 rounded-full bg-primary/10">
                                    <Clock size={12} className="text-primary" />
                                </div>
                            </button>
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
                            className="bg-gradient-to-br from-success/5 to-transparent border-success/10 cursor-pointer hover:shadow-md transition-shadow flex items-center justify-center"
                            onClick={() => navigate('/apply-leave')}
                        >
                            <div className="flex flex-col items-center justify-center space-y-2 py-6">
                                <Calendar size={24} className="text-success" />
                                <span className="text-base font-bold uppercase tracking-wider text-success">Leave</span>
                            </div>
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

            {/* Punch Request Modal */}
            {showPunchRequestModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                    >
                        <div className="flex justify-between items-start p-6 pb-2">
                            <div>
                                <h3 className="text-xl font-bold text-text-main">Punch Request</h3>
                                <p className="text-xs text-text-muted mt-1">Submit a manual attendance entry</p>
                            </div>
                            <button onClick={() => setShowPunchRequestModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} className="text-text-secondary" />
                            </button>
                        </div>

                        <div className="p-6 pt-4 space-y-5">
                            {/* Punch Type */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">PUNCH TYPE</label>
                                <div className="flex p-1 bg-gray-100 rounded-xl">
                                    <button
                                        onClick={() => setPunchType('Check In')}
                                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${punchType === 'Check In' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Check In
                                    </button>
                                    <button
                                        onClick={() => setPunchType('Check Out')}
                                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${punchType === 'Check Out' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Check Out
                                    </button>
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">DATE</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full p-4 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        defaultValue={new Date().toISOString().split('T')[0]}
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Time */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">TIME</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        className="w-full p-4 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        defaultValue="09:00"
                                    />
                                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Note */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">NOTE</label>
                                <textarea
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-24"
                                    placeholder="Add a note..."
                                    defaultValue="forgot it"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={() => {
                                    setShowPunchRequestModal(false);
                                    // Here you would typically handle the submission
                                }}
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
                            >
                                Submit Punch Request
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
