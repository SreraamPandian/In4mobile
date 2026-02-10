import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Briefcase, ArrowLeft, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col">
            {/* Top Section */}
            <div className="h-[30vh] bg-gradient-to-br from-primary to-primary-dark rounded-b-[40px] relative flex flex-col justify-center px-8 text-white shadow-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        onClick={() => navigate('/login')}
                        className="p-2 -ml-2 mb-4 hover:bg-white/10 rounded-full transition-colors inline-flex items-center"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                    <p className="text-primary-light text-lg">No worries, we'll help you reset it.</p>
                </motion.div>

                {/* Decorative circles */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            </div>

            {/* Form Section */}
            <div className="flex-1 px-8 pt-10 pb-6">
                {!isSubmitted ? (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary ml-1">Client ID</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Briefcase size={20} />
                                </div>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your Client ID"
                                    className="w-full h-14 pl-12 pr-4 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main placeholder:text-text-muted"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                    <Mail size={20} />
                                </div>
                                <input
                                    required
                                    type="email"
                                    placeholder="Enter your registered email"
                                    className="w-full h-14 pl-12 pr-4 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main placeholder:text-text-muted"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                            className="mt-4 shadow-lg shadow-primary/30"
                        >
                            SUBMIT <Send size={18} className="ml-2" />
                        </Button>
                    </motion.form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                    >
                        <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                            <Send size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-text-main mb-3">Request Sent!</h2>
                        <p className="text-text-secondary mb-8">
                            If the details match our records, you will receive a password reset link shortly.
                        </p>
                        <Button
                            onClick={() => navigate('/login')}
                            fullWidth
                            variant="secondary"
                            size="lg"
                        >
                            BACK TO LOGIN
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
