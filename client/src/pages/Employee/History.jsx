import { useEffect, useState } from 'react';
import useAttendanceStore from '../../store/attendanceStore';
import { Calendar as CalendarIcon, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';
import clsx from 'clsx';

const History = () => {
    const { history, fetchHistory, isLoading } = useAttendanceStore();
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-800';
            case 'absent': return 'bg-red-100 text-red-800';
            case 'late': return 'bg-yellow-100 text-yellow-800';
            case 'half-day': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCalendarDays = () => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        const days = eachDayOfInterval({ start, end });

        // Add padding days for start of month
        const startDay = getDay(start);
        const paddingDays = Array(startDay).fill(null);

        return [...paddingDays, ...days];
    };

    const getRecordForDate = (date) => {
        if (!date) return null;
        return history.find(record => isSameDay(new Date(record.date), date));
    };

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Attendance History</h1>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('table')}
                        className={clsx(
                            "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                            viewMode === 'table' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <List className="h-4 w-4 inline-block mr-1" />
                        Table
                    </button>
                    <button
                        onClick={() => setViewMode('calendar')}
                        className={clsx(
                            "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                            viewMode === 'calendar' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <CalendarIcon className="h-4 w-4 inline-block mr-1" />
                        Calendar
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading...</div>
            ) : viewMode === 'table' ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {history.map((record) => (
                                    <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(record.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {record.totalHours ? record.totalHours.toFixed(2) + ' hrs' : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {format(currentDate, 'MMMM yyyy')}
                        </h2>
                        <div className="flex space-x-2">
                            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                                <ChevronLeft className="h-5 w-5 text-gray-600" />
                            </button>
                            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                {day}
                            </div>
                        ))}
                        {getCalendarDays().map((date, idx) => {
                            const record = getRecordForDate(date);
                            return (
                                <div key={idx} className={clsx("bg-white min-h-[100px] p-2 relative group", !date && "bg-gray-50")}>
                                    {date && (
                                        <>
                                            <span className={clsx(
                                                "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                                                isSameDay(date, new Date()) ? "bg-brand-600 text-white" : "text-gray-700"
                                            )}>
                                                {format(date, 'd')}
                                            </span>
                                            {record && (
                                                <div className="mt-2">
                                                    <span className={clsx(
                                                        "inline-block px-2 py-1 text-xs font-medium rounded-md w-full text-center truncate",
                                                        getStatusColor(record.status)
                                                    )}>
                                                        {record.status}
                                                    </span>
                                                    <div className="mt-1 text-xs text-gray-500 text-center">
                                                        {record.totalHours ? `${record.totalHours.toFixed(1)}h` : ''}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4 flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> Present</div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span> Absent</div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> Late</div>
                        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span> Half-day</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
