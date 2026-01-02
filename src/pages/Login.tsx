import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col">
            {/* Top Section */}
            <div className="h-[35vh] bg-gradient-to-br from-primary to-primary-dark rounded-b-[40px] relative flex flex-col justify-center px-8 text-white shadow-lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                    <p className="text-primary-light text-lg">Sign in to continue</p>
                </motion.div>

                {/* Decorative circles */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-black/5 rounded-full blur-xl" />
            </div>

            {/* Form Section */}
            <div className="flex-1 px-8 pt-10 pb-6">
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onSubmit={handleLogin}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-14 pl-12 pr-4 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main placeholder:text-text-muted"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                <Lock size={20} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full h-14 pl-12 pr-12 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main placeholder:text-text-muted"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <span className="text-text-secondary">Remember me</span>
                        </label>
                        <a href="#" className="text-primary font-medium hover:text-primary-dark">Forgot Password?</a>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        isLoading={isLoading}
                        className="mt-4 shadow-lg shadow-primary/30"
                    >
                        SIGN IN <ArrowRight size={18} className="ml-2" />
                    </Button>

                    {/* Skip Login for Testing */}
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="w-full mt-3 py-3 text-sm text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                        Skip Login (For Testing)
                    </button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-auto pt-8 text-center"
                >
                    <p className="text-text-muted text-sm">
                        Need help? <a href="#" className="text-primary font-medium">Contact Support</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
