import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import ReportFilter from '../components/ReportFilter';

const MyLeaveReport = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState<any[]>([]);

    const handleGenerateReport = (startDate: string, endDate: string) => {
        // Mock data - in real app, fetch from API
        const mockData = [
            { date: '2026-01-15', type: 'Casual Leave', days: 1, status: 'Approved' },
            { date: '2025-12-20', type: 'Sick Leave', days: 2, status: 'Approved' },
            { date: '2025-11-10', type: 'Earned Leave', days: 3, status: 'Rejected' },
        ];
        setReportData(mockData);
        alert(`Generating report from ${startDate} to ${endDate}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center space-x-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="dark:text-white" />
                </button>
                <h1 className="text-xl font-bold">My Leave Report</h1>
            </div>

            <div className="px-6 py-6 space-y-6">
                <ReportFilter onGenerateReport={handleGenerateReport} />

                {reportData.length > 0 && (
                    <div>
                        <h3 className="font-bold text-base mb-3">Report Results</h3>
                        <div className="space-y-3">
                            {reportData.map((item, idx) => (
                                <Card key={idx} className="dark:bg-gray-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={16} className="text-primary" />
                                            <span className="font-semibold text-sm">{item.date}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Approved' ? 'bg-success/10 text-success' :
                                                item.status === 'Rejected' ? 'bg-error/10 text-error' :
                                                    'bg-warning/10 text-warning'
                                            }`}>{item.status}</span>
                                    </div>
                                    <p className="text-sm text-text-secondary">{item.type} - {item.days} day(s)</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLeaveReport;
