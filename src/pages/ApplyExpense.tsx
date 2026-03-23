import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';
import DatePicker from '../components/ui/DatePicker';

const ApplyExpense = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);

    const handleSubmit = () => {
        const newExpense = {
            id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
            date,
            amount: Math.round(Number(amount)),
            purpose,
            status: 'Pending',
            appliedOn: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            attachmentName: attachment?.name,
            type: 'Expense Claim',
            approvals: [
                { name: 'Direct Manager', status: 'pending', remarks: '--' }
            ]
        };

        const existing = JSON.parse(localStorage.getItem('expenseClaims') || '[]');
        localStorage.setItem('expenseClaims', JSON.stringify([newExpense, ...existing]));

        alert('Expense claim submitted successfully!');
        navigate('/my-expense-report');
    };

    return (
        <div className="pb-8">
            {/* Header */}
            <div className="bg-surface px-6 pt-6 pb-4 border-b border-border flex items-center space-x-4 sticky top-0 z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-background rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-text-main" />
                </button>
                <h1 className="text-xl font-bold text-text-main">Apply for Expense</h1>
            </div>

            <div className="px-6 pt-6 space-y-6">
                {/* Date Selection */}
                <DatePicker
                    label="Date"
                    value={date}
                    onChange={setDate}
                />

                {/* Amount Field */}
                <div>
                    <label className="text-sm font-semibold text-text-main mb-2 block">Amount</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">
                            ₹
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="w-full h-16 pl-12 pr-4 bg-surface border border-border rounded-2xl text-lg font-bold text-text-main focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Purpose Selection */}
                <div>
                    <label className="text-sm font-semibold text-text-main mb-2 block">Purpose</label>
                    <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        rows={4}
                        placeholder="Describe the purpose of this expense..."
                        className="w-full p-4 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-text-main resize-none text-sm transition-all shadow-sm"
                    ></textarea>
                    <div className="flex justify-end mt-1">
                        <span className="text-xs text-text-muted">{purpose.length}/200 characters</span>
                    </div>
                </div>

                {/* File Upload */}
                <div>
                    <FileUpload
                        label="Attach Document (Receipt/Invoice)"
                        onFileSelect={(file) => setAttachment(file)}
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                </div>

                {/* Information Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start space-x-3"
                >
                    <div className="p-2 bg-primary/10 rounded-xl text-primary mt-0.5">
                        <FileText size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Guidelines</p>
                        <p className="text-[12px] text-text-secondary leading-relaxed">
                            Please ensure all receipts are clear and legible. Supported formats: PDF, JPEG, PNG. Max file size: 5MB.
                        </p>
                    </div>
                </motion.div>

                <div className="pt-4 pb-8">
                    <Button 
                        fullWidth 
                        size="lg" 
                        className="shadow-lg shadow-primary/20 h-14 text-base font-bold"
                        onClick={handleSubmit}
                        disabled={!amount || !purpose}
                    >
                        SUBMIT CLAIM
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ApplyExpense;
