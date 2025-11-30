import useAuthStore from '../../store/authStore';
import { User, Mail, Briefcase, Hash } from 'lucide-react';

const Profile = () => {
    const { user } = useAuthStore();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

            <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-indigo-50 p-6 flex items-center space-x-4">
                    <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                        <p className="text-indigo-600 font-medium capitalize">{user?.role}</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileItem icon={Mail} label="Email Address" value={user?.email} />
                        <ProfileItem icon={Briefcase} label="Department" value={user?.department || 'Not Assigned'} />
                        <ProfileItem icon={Hash} label="Employee ID" value={user?.employeeId || 'N/A'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3">
        <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="h-5 w-5 text-gray-500" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-base font-semibold text-gray-900">{value}</p>
        </div>
    </div>
);

export default Profile;
