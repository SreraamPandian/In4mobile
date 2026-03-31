import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, CheckCircle2, Calendar, LogIn, LogOut, X, MapPin, UserPlus, ClipboardList, ArrowLeftRight, Smartphone, KeyRound, Loader2 } from 'lucide-react';
import Card from '../components/ui/Card';
import TimeThemeIcon from '../components/ui/TimeThemeIcon';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showPunchRequestModal, setShowPunchRequestModal] = useState(false);
    const [punchType, setPunchType] = useState('Check In');

    // Remarks modal state
    const [showRemarksModal, setShowRemarksModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<'in' | 'out' | null>(null);
    const [remarks, setRemarks] = useState('');
    const [checkInRemark, setCheckInRemark] = useState<string>('');
    const [checkOutRemark, setCheckOutRemark] = useState<string>('');

    // Visitor Auth Modal State
    const [showVisitorAuth, setShowVisitorAuth] = useState(false);
    const [visitorAuthStep, setVisitorAuthStep] = useState<'mobile' | 'otp'>('mobile');
    const [visitorMobile, setVisitorMobile] = useState('');
    const [visitorOtp, setVisitorOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const openRemarksModal = (action: 'in' | 'out') => {
        setPendingAction(action);
        setRemarks('');
        setShowRemarksModal(true);
    };

    const handleRemarksSubmit = () => {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const todayKey = new Date().toISOString().split('T')[0];

        if (pendingAction === 'in') {
            setCheckInTime(time);
            setCheckInRemark(remarks);
            setIsCheckedIn(true);
            const stored = JSON.parse(localStorage.getItem('attendanceRemarks') || '{}');
            stored[todayKey] = { ...stored[todayKey], checkInRemark: remarks, checkInTime: time };
            localStorage.setItem('attendanceRemarks', JSON.stringify(stored));
        } else {
            setCheckOutTime(time);
            setCheckOutRemark(remarks);
            setIsCheckedIn(false);
            const stored = JSON.parse(localStorage.getItem('attendanceRemarks') || '{}');
            stored[todayKey] = { ...stored[todayKey], checkOutRemark: remarks, checkOutTime: time };
            localStorage.setItem('attendanceRemarks', JSON.stringify(stored));
        }

        setShowRemarksModal(false);
        setPendingAction(null);
        setRemarks('');
    };

    const handleVisitorEntryClick = () => {
        setVisitorAuthStep('mobile');
        setVisitorMobile('');
        setVisitorOtp('');
        setShowVisitorAuth(true);
    };

    const handleSendOtp = () => {
        if (visitorMobile.length >= 10) {
            setVisitorAuthStep('otp');
        }
    };

    const handleVerifyOtp = () => {
        if (visitorOtp.length >= 4) {
            setIsVerifying(true);
            // Simulate API call delay
            setTimeout(() => {
                setIsVerifying(false);
                setShowVisitorAuth(false);
                navigate('/add-visitor', { state: { mobile: visitorMobile } });
            }, 800);
        }
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
                            <button
                                onClick={() => navigate('/map-view')}
                                className="p-3 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-colors shadow-sm active:scale-95"
                            >
                                <MapPin size={24} />
                            </button>
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
                                    onClick={() => openRemarksModal('in')}
                                    className="group flex flex-col items-center justify-center relative transition-transform active:scale-95"
                                >
                                    <div className="w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center relative">
                                        <div className="absolute w-28 h-28 rounded-full border border-primary/20 flex items-center justify-center"></div>
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center z-10">
                                            <LogIn size={28} className="text-primary ml-1" />
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-primary mt-3">Check In</span>
                                    {checkInTime && <span className="text-xs font-medium text-success absolute -bottom-6">{checkInTime}</span>}
                                </button>
                            ) : (
                                <button
                                    onClick={() => openRemarksModal('out')}
                                    className="group flex flex-col items-center justify-center relative transition-transform active:scale-95"
                                >
                                    <div className="w-40 h-40 rounded-full bg-red-50 flex items-center justify-center relative">
                                        <div className="absolute w-28 h-28 rounded-full border border-red-200 flex items-center justify-center"></div>
                                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center z-10">
                                            <LogOut size={28} className="text-red-600 mr-1" />
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-red-600 mt-3">Check Out</span>
                                    {checkOutTime && <span className="text-xs font-medium text-error absolute -bottom-6">{checkOutTime}</span>}
                                </button>
                            )}
                        </div>

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

                        {(checkInTime || checkOutTime) && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <h4 className="font-bold text-sm text-gray-700">Today's Attendance</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {checkInTime && (
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check In</p>
                                            <p className="text-sm font-semibold text-success">{checkInTime}</p>
                                            {checkInRemark && <p className="text-xs text-text-muted mt-0.5 italic">"{checkInRemark}"</p>}
                                        </div>
                                    )}
                                    {checkOutTime && (
                                        <div>
                                            <p className="text-xs text-text-secondary mb-1">Check Out</p>
                                            <p className="text-sm font-semibold text-error">{checkOutTime}</p>
                                            {checkOutRemark && <p className="text-xs text-text-muted mt-0.5 italic">"{checkOutRemark}"</p>}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => navigate('/map-view')}
                                    className="w-full py-2.5 bg-primary/5 text-primary border border-primary/10 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-primary/10 transition-all active:scale-[0.98]"
                                >
                                    <MapPin size={16} />
                                    <span>View on Map</span>
                                </button>
                            </div>
                        )}
                    </Card>
                </motion.div>

                {/* Visitor Management Shortcuts */}
                <motion.div variants={item}>
                    <h3 className="text-base font-semibold text-text-main mb-3">Visitor Management</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <Card
                            className="flex flex-col items-center justify-center p-3 cursor-pointer hover:shadow-md transition-shadow border-emerald-100/50 bg-emerald-50/30"
                            onClick={handleVisitorEntryClick}
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                                <UserPlus size={20} />
                            </div>
                            <span className="text-[11px] font-bold text-center text-text-main">Entry</span>
                        </Card>
                        <Card
                            className="flex flex-col items-center justify-center p-3 cursor-pointer hover:shadow-md transition-shadow border-blue-100/50 bg-blue-50/30"
                            onClick={() => navigate('/visitor-pre-entry')}
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                                <ClipboardList size={20} />
                            </div>
                            <span className="text-[11px] font-bold text-center text-text-main">Pre Entry</span>
                        </Card>
                        <Card
                            className="flex flex-col items-center justify-center p-3 cursor-pointer hover:shadow-md transition-shadow border-purple-100/50 bg-purple-50/30"
                            onClick={() => navigate('/visitor-check-in-out')}
                        >
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                                <ArrowLeftRight size={20} />
                            </div>
                            <span className="text-[11px] font-bold text-center text-text-main">Check In/Out</span>
                        </Card>
                    </div>
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

            {/* Visitor Auth Modal */}
            <AnimatePresence>
                {showVisitorAuth && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowVisitorAuth(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6"
                        >
                            <button
                                onClick={() => setShowVisitorAuth(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                            >
                                <X size={20} />
                            </button>

                            {visitorAuthStep === 'mobile' ? (
                                <div className="space-y-6 pt-2">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Smartphone size={32} className="text-primary" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xl font-bold text-gray-900">Visitor Entry</h3>
                                        <p className="text-sm text-gray-500">Enter visitor's mobile number to continue</p>
                                    </div>
                                    
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={visitorMobile}
                                            onChange={(e) => setVisitorMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-center text-lg font-semibold tracking-widest"
                                        />
                                    </div>

                                    <Button 
                                        fullWidth 
                                        size="lg" 
                                        onClick={handleSendOtp}
                                        disabled={visitorMobile.length < 10}
                                        className="shadow-lg shadow-primary/20"
                                    >
                                        Send OTP
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6 pt-2">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <KeyRound size={32} className="text-primary" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xl font-bold text-gray-900">Verify OTP</h3>
                                        <p className="text-sm text-gray-500">Enter the OTP sent to <br/><span className="font-semibold text-gray-800">+91 {visitorMobile}</span></p>
                                    </div>
                                    
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter 4-digit OTP"
                                            value={visitorOtp}
                                            onChange={(e) => setVisitorOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                            className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-center text-2xl font-bold tracking-[0.5em]"
                                        />
                                    </div>

                                    <Button 
                                        fullWidth 
                                        size="lg" 
                                        onClick={handleVerifyOtp}
                                        disabled={visitorOtp.length < 4 || isVerifying}
                                        className="shadow-lg shadow-primary/20"
                                    >
                                        {isVerifying ? (
                                            <span className="flex items-center space-x-2">
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Verifying...</span>
                                            </span>
                                        ) : (
                                            "Verify & Continue"
                                        )}
                                    </Button>
                                    
                                    <div className="text-center">
                                        <button 
                                            onClick={() => setVisitorAuthStep('mobile')}
                                            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                                            disabled={isVerifying}
                                        >
                                            Change Mobile Number
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Remarks Modal for Check In / Check Out */}
            <AnimatePresence>
                {showRemarksModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowRemarksModal(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl p-5"
                        >
                            <h3 className="text-base font-bold text-gray-900 mb-0.5">Add Remarks</h3>
                            <p className="text-xs text-gray-400 mb-4">Please enter remarks to continue</p>
                            <textarea
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value.slice(0, 45))}
                                rows={3}
                                placeholder="Enter remarks..."
                                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-800 resize-none text-sm transition-all"
                            />
                            <p className="text-[11px] text-gray-400 text-right mt-1 mb-4">{remarks.length}/45</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setShowRemarksModal(false)}
                                    className="py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRemarksSubmit}
                                    className="py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-md shadow-primary/30"
                                >
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">NOTE</label>
                                <textarea
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-24"
                                    placeholder="Add a note..."
                                    defaultValue="forgot it"
                                ></textarea>
                            </div>
                            <button
                                onClick={() => setShowPunchRequestModal(false)}
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
