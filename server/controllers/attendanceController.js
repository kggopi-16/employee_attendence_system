const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Check in
// @route   POST /api/attendance/checkin
// @access  Private
const checkIn = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingAttendance = await Attendance.findOne({
            userId: req.user._id,
            date: { $gte: today },
        });

        if (existingAttendance) {
            return res.status(400).json({ message: 'Already checked in today' });
        }

        const now = new Date();
        const checkInTime = new Date();

        // Late arrival logic: After 9:00 AM
        const lateThreshold = new Date();
        lateThreshold.setHours(9, 0, 0, 0);

        let status = 'present';
        if (now > lateThreshold) {
            status = 'late';
        }

        const attendance = await Attendance.create({
            userId: req.user._id,
            date: now,
            checkInTime: checkInTime,
            status: status,
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Check out
// @route   POST /api/attendance/checkout
// @access  Private
const checkOut = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            userId: req.user._id,
            date: { $gte: today },
        });

        if (!attendance) {
            return res.status(400).json({ message: 'You have not checked in today' });
        }

        attendance.checkOutTime = new Date();

        // Calculate total hours
        const duration = attendance.checkOutTime - attendance.checkInTime;
        attendance.totalHours = duration / (1000 * 60 * 60); // Hours

        await attendance.save();

        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my attendance history
// @route   GET /api/attendance/my-history
// @access  Private
const getMyHistory = async (req, res) => {
    try {
        const history = await Attendance.find({ userId: req.user._id }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all attendance (Manager)
// @route   GET /api/attendance/all
// @access  Private/Manager
const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate('userId', 'name email employeeId department').sort({ date: -1 });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get today's status
// @route   GET /api/attendance/today
// @access  Private
const getTodayStatus = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            userId: req.user._id,
            date: { $gte: today },
        });

        res.json(attendance || null);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Export attendance to CSV
// @route   GET /api/attendance/export
// @access  Private/Manager
const exportAttendance = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const query = {};

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const attendance = await Attendance.find(query).populate('userId', 'name email employeeId department').sort({ date: -1 });

        const csvRows = [];
        // Header
        csvRows.push(['Date', 'Employee ID', 'Name', 'Department', 'Check In', 'Check Out', 'Status', 'Total Hours'].join(','));

        // Data
        attendance.forEach(record => {
            const checkIn = record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : '-';
            const checkOut = record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : '-';
            const date = new Date(record.date).toLocaleDateString();

            csvRows.push([
                date,
                record.userId?.employeeId || '-',
                record.userId?.name || 'Unknown',
                record.userId?.department || '-',
                checkIn,
                checkOut,
                record.status,
                record.totalHours.toFixed(2)
            ].join(','));
        });

        const csvString = csvRows.join('\n');
        res.header('Content-Type', 'text/csv');
        res.attachment('attendance_report.csv');
        return res.send(csvString);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    checkIn,
    checkOut,
    getMyHistory,
    getAllAttendance,
    getTodayStatus,
    exportAttendance,
};
