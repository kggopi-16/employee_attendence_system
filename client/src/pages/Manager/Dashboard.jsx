import { useEffect } from 'react';
import useAttendanceStore from '../../store/attendanceStore';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import clsx from 'clsx';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const ManagerDashboard = () => {
    const { stats, fetchManagerStats, isLoading, error } = useAttendanceStore();

    useEffect(() => {
        fetchManagerStats();
    }, [fetchManagerStats]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64 text-red-500">
                <p className="text-lg font-semibold">Error loading dashboard</p>
                <p className="text-sm">{error}</p>
                <button
                    onClick={() => fetchManagerStats()}
                    className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!stats) {
        return <div className="flex justify-center items-center h-64">No data available</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Employees" value={stats.totalEmployees} icon={Users} color="text-blue-600" bg="bg-blue-50" />
                <StatCard title="Present Today" value={stats.presentCount} icon={UserCheck} color="text-green-600" bg="bg-green-50" />
                <StatCard title="Absent Today" value={stats.absentCount} icon={UserX} color="text-red-600" bg="bg-red-50" />
                <StatCard title="Late Today" value={stats.lateCount} icon={Clock} color="text-yellow-600" bg="bg-yellow-50" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Trend Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.weeklyTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="present" fill="#22c55e" name="Present" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="late" fill="#eab308" name="Late" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Department Stats Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Attendance</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.departmentStats} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="present" fill="#0ea5e9" name="Present" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Absent Employees List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Absent Employees Today</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stats.absentEmployees?.length > 0 ? (
                                stats.absentEmployees.map((emp) => (
                                    <tr key={emp._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.employeeId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.department}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Absent
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No employees absent today.
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-transform hover:scale-105 duration-200">
        <div className={clsx("p-3 rounded-full", bg, color)}>
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export default ManagerDashboard;
