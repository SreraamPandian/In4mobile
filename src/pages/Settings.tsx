import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Globe, Shield, HelpCircle, Info, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Russian', 'Arabic', 'Polish'];

    const handleLanguageSelect = (lang: string) => {
        setSelectedLanguage(lang);
        setShowLanguageModal(false);
        showToast(`Language changed to ${lang}`);
    };

    const openLink = (path: string) => {
        navigate(path);
    };

    return (
        <div className="pb-24 px-6 pt-6 bg-gray-50 min-h-screen relative">
            <h1 className="text-2xl font-bold text-text-main mb-6">Settings</h1>

            <div className="space-y-6">
                {/* Preferences */}
                <section>
                    <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3 px-1">Preferences</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                    <Bell size={20} />
                                </div>
                                <span className="font-medium text-text-main">Notifications</span>
                            </div>
                            <button className="relative w-12 h-6 bg-primary rounded-full transition-colors">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                            </button>
                        </div>
                        <button
                            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm active:scale-98 transition-all"
                            onClick={() => setShowLanguageModal(true)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <Globe size={20} />
                                </div>
                                <span className="font-medium text-text-main">Language</span>
                            </div>
                            <div className="flex items-center space-x-2 text-text-secondary">
                                <span className="text-sm">{selectedLanguage}</span>
                                <ChevronRight size={16} />
                            </div>
                        </button>
                    </div>
                </section>

                {/* Support & Info */}
                <section>
                    <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3 px-1">Support</h2>
                    <div className="space-y-3">
                        {[
                            { icon: Shield, label: 'Privacy Policy', color: 'bg-orange-50 text-orange-600', path: '/privacy-policy' },
                            { icon: HelpCircle, label: 'Help & Support', color: 'bg-teal-50 text-teal-600', path: '/help-support' },
                            { icon: Info, label: 'About App', color: 'bg-indigo-50 text-indigo-600', path: '/about-app' },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => openLink(item.path)}
                                className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm active:scale-98 transition-all"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${item.color}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <span className="font-medium text-text-main">{item.label}</span>
                                </div>
                                <ChevronRight size={16} className="text-text-muted" />
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* Language Modal */}
            <AnimatePresence>
                {showLanguageModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
                            onClick={() => setShowLanguageModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-1/3 left-6 right-6 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-[70] overflow-hidden max-h-[70vh]"
                        >
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <h3 className="font-bold text-lg">Select Language</h3>
                                <button onClick={() => setShowLanguageModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <div className="p-2 overflow-y-auto max-h-[calc(70vh-80px)]">
                                {languages.map((lang, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleLanguageSelect(lang)}
                                        className={`w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors ${selectedLanguage === lang ? 'bg-primary/10 text-primary font-medium' : 'text-text-main'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-24 left-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg z-50 text-center"
                    >
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
