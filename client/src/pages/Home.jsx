import { Link } from 'react-router-dom';
import { UserCircle, ShieldCheck, Clock } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center items-center p-4 animate-fade-in">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side - Intro */}
                <div className="md:w-1/2 p-8 md:p-12 bg-brand-600 text-white flex flex-col justify-center">
                    <div className="flex items-center mb-6">
                        <Clock className="h-10 w-10 mr-3" />
                        <h1 className="text-3xl font-bold">AttendEase</h1>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Smart Attendance Management</h2>
                    <p className="text-blue-100 mb-8 leading-relaxed">
                        Streamline your workforce management with our intuitive attendance tracking system.
                        Effortless check-ins, real-time insights, and comprehensive reporting.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="bg-brand-500 p-2 rounded-lg mr-4">
                                <UserCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-medium">Employee Portal</h3>
                                <p className="text-sm text-blue-200">Track your hours and history</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-brand-500 p-2 rounded-lg mr-4">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-medium">Manager Dashboard</h3>
                                <p className="text-sm text-blue-200">Monitor team performance</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Options */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Please select your login portal</p>
                    </div>

                    <div className="space-y-4">
                        <Link
                            to="/login/employee"
                            className="group relative w-full flex items-center justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <UserCircle className="mr-3 h-6 w-6" />
                            Employee Login
                        </Link>

                        <Link
                            to="/login/manager"
                            className="group relative w-full flex items-center justify-center py-4 px-4 border-2 border-gray-200 text-lg font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                        >
                            <ShieldCheck className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-700" />
                            Manager Login
                        </Link>
                    </div>

                    <div className="mt-10 text-center text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} AttendEase System
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
