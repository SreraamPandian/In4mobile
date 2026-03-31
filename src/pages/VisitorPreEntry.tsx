import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Building2, Phone, Mail, MapPin, Tag, ChevronDown, Calendar, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const VisitorPreEntry = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        visitorName: '',
        companyName: '',
        mobileNo: '',
        emailId: '',
        expectedDate: '',
        expectedTime: '',
        location: '',
        category: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Pre-Entry Data:', formData);
        alert('Pre-Entry Visitor added successfully!');
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-text-main">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-border shadow-sm">
                <div className="flex items-center space-x-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-text-main" />
                    </button>
                    <h1 className="text-xl font-bold text-text-main">Pre-Entry Visitor</h1>
                </div>
            </div>

            <div className="px-6 pt-6 pb-8 max-w-lg mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="mb-6">
                        <h2 className="text-2xl font-light text-text-main leading-tight">
                            Register a <br />
                            <span className="font-bold text-primary">Pre-Entry Visitor.</span>
                        </h2>
                        <p className="text-sm text-text-muted mt-2">Fill in the details to generate an entry pass in advance.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Card className="space-y-5 p-5">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Visitor Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <User size={18} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="visitorName"
                                        value={formData.visitorName}
                                        onChange={handleInputChange}
                                        placeholder="Enter full name"
                                        className="w-full h-14 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Building2 size={18} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Acme Corp"
                                        className="w-full h-14 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Mobile No <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        required
                                        type="tel"
                                        name="mobileNo"
                                        value={formData.mobileNo}
                                        onChange={handleInputChange}
                                        placeholder="10-digit mobile number"
                                        className="w-full h-14 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Email ID <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        name="emailId"
                                        value={formData.emailId}
                                        onChange={handleInputChange}
                                        placeholder="visitor@example.com"
                                        className="w-full h-14 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                        Expected Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                            <Calendar size={16} />
                                        </div>
                                        <input
                                            required
                                            type="date"
                                            name="expectedDate"
                                            value={formData.expectedDate}
                                            onChange={handleInputChange}
                                            className="w-full h-14 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all text-gray-700 appearance-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                        Expected Time <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                            <Clock size={16} />
                                        </div>
                                        <input
                                            required
                                            type="time"
                                            name="expectedTime"
                                            value={formData.expectedTime}
                                            onChange={handleInputChange}
                                            className="w-full h-14 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all text-gray-700 appearance-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <MapPin size={16} />
                                        </div>
                                        <select
                                            required
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full h-14 pl-9 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="hq">Headquarters</option>
                                            <option value="branch1">Branch 1</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Tag size={16} />
                                        </div>
                                        <select
                                            required
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full h-14 pl-9 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="vendor">Vendor</option>
                                            <option value="interview">Interview</option>
                                            <option value="meeting">Meeting</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="pt-4 grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate(-1)}
                                className="h-14 rounded-xl font-bold"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="h-14 rounded-xl font-bold shadow-lg shadow-primary/30"
                            >
                                Save Details
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default VisitorPreEntry;
