const express = require('express');
const router = express.Router();
const {
    checkIn,
    checkOut,
    getMyHistory,
    getAllAttendance,
    getTodayStatus,
    exportAttendance,
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);
router.get('/my-history', protect, getMyHistory);
router.get('/today', protect, getTodayStatus);

// Manager routes
router.get('/all', protect, authorize('manager'), getAllAttendance);
router.get('/export', protect, authorize('manager'), exportAttendance);

module.exports = router;
