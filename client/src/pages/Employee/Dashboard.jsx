import { useEffect } from 'react';
import useAttendanceStore from '../../store/attendanceStore';
import useAuthStore from '../../store/authStore';
import { Clock, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const EmployeeDashboard = () => {
    const { user } = useAuthStore();
    const {
        todayStatus,
        stats,
        fetchTodayStatus,
        fetchEmployeeStats,
        checkIn,
        checkOut,
        isLoading
    } = useAttendanceStore();

    useEffect(() => {
        fetchTodayStatus();
        fetchEmployeeStats();
    }, [fetchTodayStatus, fetchEmployeeStats]);

    const handleCheckIn = async () => {
        const success = await checkIn();
        if (success) {
            toast.success('Checked in successfully');
            await fetchTodayStatus();
            fetchEmployeeStats();
        } else {
            toast.error('Failed to check in');
        }
    };

    const handleCheckOut = async () => {
        const success = await checkOut();
        if (success) {
            toast.success('Checked out successfully');
            await fetchTodayStatus();
            fetchEmployeeStats();
        } else {
            toast.error('Failed to check out');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <div className="text-sm text-gray-500">
                    {format(new Date(), 'EEEE, MMMM do, yyyy')}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Status</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className={clsx(
                            "p-3 rounded-full",
                            todayStatus ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        )}>
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Current Status</p>
                            <p className="text-lg font-bold text-gray-900">
                                {todayStatus ? (todayStatus.checkOutTime ? 'Checked Out' : 'Checked In') : 'Not Checked In'}
                            </p>
                            {todayStatus && (
                                <p className="text-xs text-gray-500">
                                    In: {format(new Date(todayStatus.checkInTime), 'hh:mm a')}
                                    {todayStatus.checkOutTime && ` • Out: ${format(new Date(todayStatus.checkOutTime), 'hh:mm a')}`}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {!todayStatus && (
                            <button
                                onClick={handleCheckIn}
                                disabled={isLoading}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium transition-colors"
                            >
                                Check In
                            </button>
                        )}
                        {todayStatus && !todayStatus.checkOutTime && (
                            <button
                                onClick={handleCheckOut}
                                disabled={isLoading}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition-colors"
                            >
                                Check Out
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Present Days"
                    value={stats?.presentDays || 0}
                    icon={CheckCircle}
                    color="text-green-600"
                    bg="bg-green-50"
                />
                <StatCard
                    title="Absent Days"
                    value={stats?.absentDays || 0}
                    icon={AlertCircle}
                    color="text-red-600"
                    bg="bg-red-50"
                />
                <StatCard
                    title="Late Arrivals"
                    value={stats?.lateDays || 0}
                    icon={Clock}
                    color="text-yellow-600"
                    bg="bg-yellow-50"
                />
                <StatCard
                    title="Total Hours"
                    value={stats?.totalHours || 0}
                    icon={Calendar}
                    color="text-blue-600"
                    bg="bg-blue-50"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stats?.recentActivity?.map((record) => (
                                <tr key={record._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {format(new Date(record.date), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={clsx(
                                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                            record.status === 'present' ? "bg-green-100 text-green-800" :
                                                record.status === 'absent' ? "bg-red-100 text-red-800" :
                                                    "bg-yellow-100 text-yellow-800"
                                        )}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.checkInTime ? format(new Date(record.checkInTime), 'hh:mm a') : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.checkOutTime ? format(new Date(record.checkOutTime), 'hh:mm a') : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {record.totalHours ? record.totalHours.toFixed(1) : '-'}
                                    </td>
                                </tr>
                            ))}
                            {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No recent activity found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className={clsx("p-3 rounded-full", bg, color)}>
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export default EmployeeDashboard;
