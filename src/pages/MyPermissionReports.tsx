import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import ReportFilter from '../components/ReportFilter';

const MyPermissionReports = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState<any[]>([]);

    const handleGenerateReport = (startDate: string, endDate: string) => {
        const mockData = [
            { date: '2026-01-10', time: '10:00 AM - 11:30 AM', reason: 'Doctor appointment', status: 'Approved' },
            { date: '2025-12-15', time: '02:00 PM - 03:00 PM', reason: 'Personal work', status: 'Pending' },
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
                <h1 className="text-xl font-bold">My Permission Reports</h1>
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
                                            <Calendar size={16} className="text-primary/70" />
                                            <span className="font-semibold text-sm">{item.date}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Approved' ? 'bg-success/10 text-success' :
                                            item.status === 'Rejected' ? 'bg-error/10 text-error' :
                                                'bg-warning/10 text-warning'
                                            }`}>{item.status}</span>
                                    </div>
                                    <p className="text-sm text-text-secondary mb-1">{item.time}</p>
                                    <p className="text-sm text-text-main">{item.reason}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPermissionReports;
