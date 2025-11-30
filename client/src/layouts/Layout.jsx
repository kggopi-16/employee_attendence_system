import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import {
    LayoutDashboard,
    Calendar,
    User,
    LogOut,
    Users,
    FileText,
    Clock,
    Menu,
    X
} from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

const Layout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const employeeLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Mark Attendance', path: '/dashboard/mark-attendance', icon: Clock },
        { name: 'My History', path: '/dashboard/history', icon: Calendar },
        { name: 'Profile', path: '/dashboard/profile', icon: User },
    ];

    const managerLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'All Employees', path: '/dashboard/employees', icon: Users },
        { name: 'Reports', path: '/dashboard/reports', icon: FileText },
    ];

    const links = user?.role === 'manager' ? managerLinks : employeeLinks;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50 bg-white border-r border-gray-200">
                <div className="flex items-center h-16 flex-shrink-0 px-6 bg-white border-b border-gray-100">
                    <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">AttendEase</span>
                </div>

                <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
                    <nav className="mt-5 flex-1 px-4 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={clsx(
                                        'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                                        isActive
                                            ? 'bg-brand-50 text-brand-700 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    <Icon className={clsx(
                                        'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200',
                                        isActive ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-500'
                                    )} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <div className="flex-shrink-0 w-full group block">
                        <div className="flex items-center">
                            <div className="inline-block h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
                                <span className="text-brand-700 font-bold text-lg">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                    {user?.name}
                                </p>
                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 capitalize">
                                    {user?.role}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="ml-auto p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                                title="Logout"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">AttendEase</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-30 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl flex flex-col">
                    <div className="h-16 flex items-center px-6 border-b border-gray-200">
                        <span className="text-xl font-bold text-gray-900">Menu</span>
                    </div>
                    <nav className="flex-1 px-4 py-4 space-y-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={clsx(
                                        'flex items-center px-3 py-3 text-base font-medium rounded-lg',
                                        isActive
                                            ? 'bg-brand-50 text-brand-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    <Icon className={clsx(
                                        'mr-4 h-6 w-6',
                                        isActive ? 'text-brand-600' : 'text-gray-400'
                                    )} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            <LogOut className="mr-4 h-6 w-6" />
                            Logout
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 md:pl-72 flex flex-col min-h-screen">
                <main className="flex-1 py-6 px-4 sm:px-6 md:py-8 md:px-8 mt-16 md:mt-0">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
