const express = require('express');
const router = express.Router();
const {
    getEmployeeStats,
    getManagerStats,
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/employee', protect, getEmployeeStats);
router.get('/manager', protect, authorize('manager'), getManagerStats);

module.exports = router;
