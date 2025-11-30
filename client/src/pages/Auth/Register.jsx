import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { UserPlus, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'employee',
        department: '',
        employeeId: '',
    });

    const { register, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) {
            toast.success('Account created successfully');
            navigate('/dashboard');
        } else {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white z-10">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="animate-fade-in">
                        <div className="h-12 w-12 bg-brand-100 rounded-xl flex items-center justify-center mb-8">
                            <UserPlus className="h-6 w-6 text-brand-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Get started with your free account
                        </p>
                    </div>

                    <div className="mt-8 animate-slide-up">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="input-field mt-1"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="input-field mt-1"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="input-field mt-1"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Emp ID</label>
                                    <input
                                        name="employeeId"
                                        type="text"
                                        required
                                        className="input-field mt-1"
                                        placeholder="EMP001"
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                    <input
                                        name="department"
                                        type="text"
                                        required
                                        className="input-field mt-1"
                                        value={formData.department}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full btn-primary flex justify-center group"
                                >
                                    {isLoading ? 'Creating...' : 'Create Account'}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login/employee" className="font-medium text-brand-600 hover:text-brand-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Gradient */}
            <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-brand-600 to-brand-900 flex items-center justify-center text-white p-12">
                    <div className="max-w-lg text-center animate-fade-in">
                        <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
                        <p className="text-xl text-brand-100">
                            Experience the future of workplace management. Simple, fast, and reliable.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
