const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    checkInTime: {
        type: Date,
    },
    checkOutTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late', 'half-day'],
        default: 'absent',
    },
    totalHours: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Indexes for performance
attendanceSchema.index({ userId: 1, date: -1 }); // For fetching user history
attendanceSchema.index({ date: 1 }); // For reports and filtering

module.exports = mongoose.model('Attendance', attendanceSchema);
