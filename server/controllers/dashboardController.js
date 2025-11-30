const User = require('../models/User');
const Attendance = require('../models/Attendance');

// @desc    Get employee dashboard stats
// @route   GET /api/dashboard/employee
// @access  Private
const getEmployeeStats = async (req, res) => {
    try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Get attendance for this month
        const monthlyAttendance = await Attendance.find({
            userId: req.user._id,
            date: { $gte: startOfMonth, $lte: endOfMonth },
        });

        const presentDays = monthlyAttendance.filter(a => a.status === 'present').length;
        const absentDays = monthlyAttendance.filter(a => a.status === 'absent').length;
        const lateDays = monthlyAttendance.filter(a => a.status === 'late').length;
        const totalHours = monthlyAttendance.reduce((acc, curr) => acc + (curr.totalHours || 0), 0);

        // Get recent activity (last 7 days)
        const recentActivity = await Attendance.find({
            userId: req.user._id,
        })
            .sort({ date: -1 })
            .limit(7);

        res.json({
            presentDays,
            absentDays,
            lateDays,
            totalHours: totalHours.toFixed(2),
            recentActivity,
        });
    } catch (error) {
        console.error('Error in getEmployeeStats:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get manager dashboard stats
// @route   GET /api/dashboard/manager
// @access  Private/Manager
const getManagerStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Total employees
        const totalEmployees = await User.countDocuments({ role: 'employee' });

        // Today's attendance
        const todaysAttendance = await Attendance.find({
            date: { $gte: today },
        });

        const presentCount = todaysAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
        const lateCount = todaysAttendance.filter(a => a.status === 'late').length;
        const absentCount = totalEmployees - presentCount;

        // Get absent employees list
        // Filter out records with missing userId to avoid crashes
        const presentUserIds = todaysAttendance
            .filter(a => a.userId)
            .map(a => a.userId);

        const absentEmployees = await User.find({
            role: 'employee',
            _id: { $nin: presentUserIds },
        }).select('name email department employeeId');

        // Weekly Trend (Last 7 days)
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        const weeklyAttendance = await Attendance.find({
            date: { $gte: sevenDaysAgo, $lte: new Date() }
        });

        const weeklyTrend = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(sevenDaysAgo);
            d.setDate(d.getDate() + i);
            const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' });

            const dayRecords = weeklyAttendance.filter(a =>
                a.date && new Date(a.date).toDateString() === d.toDateString()
            );

            weeklyTrend.push({
                name: dateStr,
                present: dayRecords.filter(a => a.status === 'present' || a.status === 'late').length,
                absent: totalEmployees - dayRecords.length, // Approximation
                late: dayRecords.filter(a => a.status === 'late').length
            });
        }

        // Department Stats
        const employeesWithAttendance = await User.find({ role: 'employee' }).lean();
        const deptData = {};

        employeesWithAttendance.forEach(emp => {
            const dept = emp.department || 'Unknown';
            if (!deptData[dept]) {
                deptData[dept] = { name: dept, present: 0, absent: 0, late: 0 };
            }

            // Safe check for userId
            const isPresent = todaysAttendance.find(a => a.userId && a.userId.toString() === emp._id.toString());
            if (isPresent) {
                deptData[dept].present++;
                if (isPresent.status === 'late') deptData[dept].late++;
            } else {
                deptData[dept].absent++;
            }
        });

        const departmentStatsArray = Object.values(deptData);

        res.json({
            totalEmployees,
            presentCount,
            absentCount,
            lateCount,
            absentEmployees,
            weeklyTrend,
            departmentStats: departmentStatsArray
        });
    } catch (error) {
        console.error('Error in getManagerStats:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEmployeeStats,
    getManagerStats,
};
