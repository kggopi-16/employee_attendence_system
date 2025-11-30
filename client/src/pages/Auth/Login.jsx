import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { LogIn, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = ({ role = 'employee' }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const title = role === 'manager' ? 'Manager Login' : 'Employee Login';
    const isManager = role === 'manager';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            toast.success('Logged in successfully');
            // Navigation is handled in the component or store, but store returns success boolean
            // Check where to navigate based on role
            // The store updates the user state.
            const user = useAuthStore.getState().user;
            if (user?.role === 'manager') {
                navigate('/dashboard'); // Both go to dashboard, handled by App.jsx routing
            } else {
                navigate('/dashboard');
            }
        } else {
            toast.error('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white z-10">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="animate-fade-in">
                        <div className="h-12 w-12 bg-brand-100 rounded-xl flex items-center justify-center mb-8">
                            <LogIn className="h-6 w-6 text-brand-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please sign in to your account
                        </p>
                    </div>

                    <div className="mt-8 animate-slide-up">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input
                                    type="email"
                                    required
                                    className="input-field mt-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="input-field mt-1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full btn-primary flex justify-center group"
                                >
                                    {isLoading ? 'Signing in...' : 'Sign in'}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>

                        {!isManager && (
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="font-medium text-brand-600 hover:text-brand-500">
                                        Register new account
                                    </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Gradient */}
            <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white p-12">
                    <div className="max-w-lg text-center animate-fade-in">
                        <h1 className="text-4xl font-bold mb-6">Employee Attendance System</h1>
                        <p className="text-xl text-brand-100">
                            Streamline your workforce management with our modern, efficient, and easy-to-use attendance tracking solution.
                        </p>
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
