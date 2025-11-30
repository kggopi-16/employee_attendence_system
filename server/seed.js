const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Attendance = require('./models/Attendance');
require('dotenv').config();

const users = [
    {
        name: 'Manager User',
        email: 'manager@example.com',
        password: 'password123',
        role: 'manager',
        department: 'HR',
    },
    {
        name: 'Employee One',
        email: 'emp1@example.com',
        password: 'password123',
        role: 'employee',
        employeeId: 'EMP001',
        department: 'Engineering',
    },
    {
        name: 'Employee Two',
        email: 'emp2@example.com',
        password: 'password123',
        role: 'employee',
        employeeId: 'EMP002',
        department: 'Sales',
    },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany({});
        await Attendance.deleteMany({});

        console.log('Cleared existing data');

        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        const createdUsers = await User.insertMany(users);
        console.log('Users seeded');

        // Create some attendance for Employee One
        const emp1 = createdUsers.find(u => u.email === 'emp1@example.com');
        const today = new Date();

        // Yesterday
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(9, 0, 0, 0);
        const yesterdayOut = new Date(yesterday);
        yesterdayOut.setHours(18, 0, 0, 0);

        await Attendance.create({
            userId: emp1._id,
            date: yesterday,
            checkInTime: yesterday,
            checkOutTime: yesterdayOut,
            status: 'present',
            totalHours: 9,
        });

        console.log('Attendance seeded');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
