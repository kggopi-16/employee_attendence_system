import { useState } from 'react';
import axios from '../../api/axios';
import { Download, FileText, Calendar } from 'lucide-react';

const Reports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/attendance/export', {
                params: { startDate, endDate },
                responseType: 'blob',
            });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
            const link = document.createElement('a');
            link.href = url;

            // Set filename
            const filename = `attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
            link.setAttribute('download', filename);

            // Append to body, click and remove
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading report:', error);
            alert('Failed to download report');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                    <div className="h-10 w-10 bg-brand-100 rounded-lg flex items-center justify-center mr-4">
                        <FileText className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Attendance Export</h2>
                        <p className="text-sm text-gray-500">Download attendance records in CSV format</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                className="input-field pl-10"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                className="input-field pl-10"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={handleDownload}
                            disabled={isLoading}
                            className="w-full btn-primary flex justify-center items-center h-[42px]"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            {isLoading ? 'Generating...' : 'Download CSV'}
                        </button>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Report Details</h3>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                        <li>Includes all employee attendance records</li>
                        <li>Filtered by the selected date range (optional)</li>
                        <li>Contains: Date, Employee ID, Name, Department, Check In/Out times, Status, Total Hours</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Reports;
