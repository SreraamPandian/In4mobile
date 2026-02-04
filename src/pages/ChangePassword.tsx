import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate password change
        setIsSuccess(true);
        setTimeout(() => {
            navigate('/profile');
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white rounded-3xl p-8 shadow-lg text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Changed!</h2>
                    <p className="text-gray-600">Your password has been updated successfully.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-28">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-6 py-4 flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/profile')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Change Password</h1>
                        <p className="text-sm text-gray-500">Update your account password</p>
                    </div>
                </div>
            </div>

            <div className="px-6 py-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Current Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="Enter current password"
                                className="w-full h-14 pl-4 pr-12 bg-white rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Enter new password"
                                className="w-full h-14 pl-4 pr-12 bg-white rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Password must be at least 8 characters
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Re-enter new password"
                                className="w-full h-14 pl-4 pr-12 bg-white rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button type="submit" fullWidth size="lg">
                            Update Password
                        </Button>
                    </div>
                </form>

                {/* Password Requirements */}
                <div className="mt-8 p-4 bg-primary/5 rounded-xl">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Password Requirements:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>At least 8 characters long</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>Include at least one uppercase letter</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>Include at least one number</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
