import EmployeeDashboard from './Dashboard';

const MarkAttendance = () => {
    return (
        <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        {/* Icon */}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-indigo-700">
                            You can also mark your attendance directly from the Dashboard.
                        </p>
                    </div>
                </div>
            </div>
            <EmployeeDashboard />
        </div>
    );
};

export default MarkAttendance;
