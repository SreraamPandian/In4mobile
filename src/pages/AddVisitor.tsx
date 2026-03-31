import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, CheckCircle2, Plus, Minus, Clock, User, Building2, Phone, Mail, Briefcase, MapPin, Tag, FileImage, Car, ShieldCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AddVisitor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const initialMobile = location.state?.mobile || '';

    const [formData, setFormData] = useState({
        visitorName: '',
        companyName: '',
        mobileNo: initialMobile,
        emailId: '',
        department: '',
        employeeName: '',
        category: '',
        designation: '',
        purposeOfVisit: '',
        address1: '',
        address2: '',
        address3: '',
    });

    const [files, setFiles] = useState({
        visitorPhoto: null as File | null,
        proofPhoto1: null as File | null,
        proofPhoto2: null as File | null,
    });

    const [members, setMembers] = useState([{ name: '', mobile: '' }]);
    const [materials, setMaterials] = useState(['']);
    const [inTime, setInTime] = useState('');
    const [hasVehicle, setHasVehicle] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState({ type: 'Two Wheeler', no: '' });
    const [accessType, setAccessType] = useState<'device' | 'deviceGroup'>('deviceGroup');
    const [accessSelection, setAccessSelection] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof typeof files) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
        }
    };

    const handleMemberChange = (index: number, field: 'name' | 'mobile', value: string) => {
        const newMembers = [...members];
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const addMember = () => setMembers([...members, { name: '', mobile: '' }]);
    const removeMember = (index: number) => setMembers(members.filter((_, i) => i !== index));

    const handleMaterialChange = (index: number, value: string) => {
        const newMaterials = [...materials];
        newMaterials[index] = value;
        setMaterials(newMaterials);
    };

    const addMaterial = () => setMaterials([...materials, '']);
    const removeMaterial = (index: number) => setMaterials(materials.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Visitor request sent successfully!');
        navigate('/dashboard');
    };

    const FileUploadInput = ({ label, required, fieldName }: { label: string, required?: boolean, fieldName: keyof typeof files }) => (
        <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-14">
                <div className="pl-4 pr-3 text-gray-400">
                    <FileImage size={18} />
                </div>
                <div className="flex-1 py-3 text-sm text-gray-500 font-medium truncate">
                    {files[fieldName] ? files[fieldName]?.name : 'No file chosen'}
                </div>
                <label className="px-6 py-3 bg-white border-l border-gray-200 text-sm font-bold text-primary cursor-pointer hover:bg-gray-50 transition-colors h-full flex items-center">
                    Browse
                    <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, fieldName)}
                        accept="image/*"
                    />
                </label>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans text-text-main">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-border shadow-sm">
                <div className="flex items-center space-x-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-text-main" />
                    </button>
                    <h1 className="text-xl font-bold text-text-main">Visitor Registration</h1>
                </div>
            </div>

            <div className="px-6 pt-6 pb-8 max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Section 1: Basic Details */}
                    <Card className="space-y-5 p-5">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-2">
                            <User size={18} className="text-primary" />
                            <h3 className="font-bold text-sm text-gray-800">Basic Details</h3>
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
                                    readOnly
                                    className="w-full h-14 pl-11 pr-4 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 font-bold cursor-not-allowed"
                                />
                                {formData.mobileNo && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1 bg-success/10 text-success px-2.5 py-1.5 rounded-lg text-xs font-bold">
                                        <CheckCircle2 size={14} />
                                        <span>Verified</span>
                                    </div>
                                )}
                            </div>
                        </div>

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
                                    placeholder="Enter Visitor Name"
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
                    </Card>

                    {/* Section 2: Visit Details */}
                    <Card className="space-y-5 p-5">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-2">
                            <Briefcase size={18} className="text-primary" />
                            <h3 className="font-bold text-sm text-gray-800">Visit Details</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="w-full h-14 pl-4 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="hr">HR</option>
                                        <option value="it">IT</option>
                                        <option value="sales">Sales</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Host Employee <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        name="employeeName"
                                        value={formData.employeeName}
                                        onChange={handleInputChange}
                                        className="w-full h-14 pl-4 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="john">John Doe</option>
                                        <option value="jane">Jane Smith</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full h-14 pl-4 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="vendor">Vendor</option>
                                        <option value="interview">Interview</option>
                                        <option value="meeting">Meeting</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                    Designation <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        className="w-full h-14 pl-4 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="manager">Manager</option>
                                        <option value="executive">Executive</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                Purpose of Visit <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-4 text-gray-400">
                                    <Tag size={18} />
                                </div>
                                <textarea
                                    required
                                    name="purposeOfVisit"
                                    value={formData.purposeOfVisit}
                                    onChange={(e) => setFormData({...formData, purposeOfVisit: e.target.value})}
                                    placeholder="Briefly describe the purpose..."
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400 resize-none h-24"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                Expected In Time
                            </label>
                            <div className="relative">
                                <input
                                    type="time"
                                    value={inTime}
                                    onChange={(e) => setInTime(e.target.value)}
                                    className="w-full h-14 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all text-gray-700 appearance-none"
                                />
                                <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </Card>

                    {/* Section 3: Address & Documents */}
                    <Card className="space-y-5 p-5">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-2">
                            <MapPin size={18} className="text-primary" />
                            <h3 className="font-bold text-sm text-gray-800">Address & Documents</h3>
                        </div>

                        <div className="space-y-3">
                            <input
                                required
                                type="text"
                                name="address1"
                                value={formData.address1}
                                onChange={handleInputChange}
                                placeholder="Address Line 1 *"
                                className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                            />
                            <input
                                type="text"
                                name="address2"
                                value={formData.address2}
                                onChange={handleInputChange}
                                placeholder="Address Line 2 (Optional)"
                                className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                            />
                            <input
                                type="text"
                                name="address3"
                                value={formData.address3}
                                onChange={handleInputChange}
                                placeholder="Address Line 3 (Optional)"
                                className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                            />
                        </div>

                        <div className="pt-2 space-y-4">
                            <FileUploadInput label="Visitor Photo" required fieldName="visitorPhoto" />
                            <FileUploadInput label="Visitor Proof Photo 1" fieldName="proofPhoto1" />
                            <FileUploadInput label="Visitor Proof Photo 2" fieldName="proofPhoto2" />
                        </div>
                    </Card>

                    {/* Section 4: Additional Information */}
                    <Card className="space-y-5 p-5">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-2">
                            <User size={18} className="text-primary" />
                            <h3 className="font-bold text-sm text-gray-800">Accompanying Members</h3>
                        </div>

                        <div className="space-y-3">
                            {members.map((member, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={member.name}
                                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                        className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Mobile"
                                        value={member.mobile}
                                        onChange={(e) => handleMemberChange(index, 'mobile', e.target.value)}
                                        className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                                    />
                                    {index === members.length - 1 ? (
                                        <button type="button" onClick={addMember} className="p-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-colors">
                                            <Plus size={20} />
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => removeMember(index)} className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors">
                                            <Minus size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-2 pt-4">
                            <Briefcase size={18} className="text-primary" />
                            <h3 className="font-bold text-sm text-gray-800">Returnable Materials</h3>
                        </div>

                        <div className="space-y-3">
                            {materials.map((material, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Item description"
                                        value={material}
                                        onChange={(e) => handleMaterialChange(index, e.target.value)}
                                        className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400"
                                    />
                                    {index === materials.length - 1 ? (
                                        <button type="button" onClick={addMaterial} className="p-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-colors">
                                            <Plus size={20} />
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => removeMaterial(index)} className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors">
                                            <Minus size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Section 5: Vehicle & Access */}
                    <Card className="space-y-5 p-5">
                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-2">
                            <Car size={18} className="text-primary" />
                            <h3 className="font-bold text-sm text-gray-800">Vehicle Information</h3>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span className="text-sm font-bold text-gray-700">Is there any vehicle?</span>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${hasVehicle ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                        {hasVehicle && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={hasVehicle} onChange={() => setHasVehicle(true)} />
                                    <span className="text-sm font-medium text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${!hasVehicle ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                        {!hasVehicle && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={!hasVehicle} onChange={() => setHasVehicle(false)} />
                                    <span className="text-sm font-medium text-gray-700">No</span>
                                </label>
                            </div>
                        </div>

                        {hasVehicle && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Type</label>
                                    <div className="relative">
                                        <select
                                            value={vehicleDetails.type}
                                            onChange={(e) => setVehicleDetails({...vehicleDetails, type: e.target.value})}
                                            className="w-full h-12 pl-4 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                        >
                                            <option value="Two Wheeler">Two Wheeler</option>
                                            <option value="Four Wheeler">Four Wheeler</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Vehicle No</label>
                                    <input
                                        type="text"
                                        placeholder="TN01AB1234"
                                        value={vehicleDetails.no}
                                        onChange={(e) => setVehicleDetails({...vehicleDetails, no: e.target.value})}
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all placeholder:text-gray-400 uppercase"
                                    />
                                </div>
                            </motion.div>
                        )}

                        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-2 pt-4">
                            <ShieldCheck size={18} className="text-primary" />
                            <h3 className="font-bold text-sm text-gray-800">Access Provisioning</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${accessType === 'device' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                        {accessType === 'device' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={accessType === 'device'} onChange={() => setAccessType('device')} />
                                    <span className="text-sm font-medium text-gray-700">Device</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${accessType === 'deviceGroup' ? 'border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                        {accessType === 'deviceGroup' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <input type="radio" className="hidden" checked={accessType === 'deviceGroup'} onChange={() => setAccessType('deviceGroup')} />
                                    <span className="text-sm font-medium text-gray-700">Device Group</span>
                                </label>
                            </div>

                            <div className="relative">
                                <select
                                    value={accessSelection}
                                    onChange={(e) => setAccessSelection(e.target.value)}
                                    className="w-full h-14 pl-4 pr-8 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium transition-all appearance-none text-gray-700"
                                >
                                    <option value="" disabled>Select {accessType === 'deviceGroup' ? 'Device Group' : 'Device'}</option>
                                    <option value="group1">Main Entrance Group</option>
                                    <option value="group2">IT Floor Group</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </Card>

                    <div className="pt-4 pb-6">
                        <Button type="submit" fullWidth size="lg" className="shadow-lg shadow-primary/30 font-bold text-base h-14">
                            Submit Registration
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddVisitor;
