import { create } from 'zustand';
import api from '../api/axios';
import axios from 'axios'; // Import axios for direct calls if needed, though api instance is better

const useAttendanceStore = create((set) => ({
    todayStatus: null,
    history: [],
    stats: null,
    isLoading: false,
    error: null,

    fetchTodayStatus: async () => {
        set({ isLoading: true });
        try {
            const response = await api.get('/attendance/today');
            set({ todayStatus: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    checkIn: async () => {
        set({ isLoading: true });
        try {
            const response = await api.post('/attendance/checkin');
            set({ todayStatus: response.data, isLoading: false });
            return true;
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || 'Check-in failed' });
            return false;
        }
    },

    checkOut: async () => {
        set({ isLoading: true });
        try {
            const response = await api.post('/attendance/checkout');
            set({ todayStatus: response.data, isLoading: false });
            return true;
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || 'Check-out failed' });
            return false;
        }
    },

    fetchHistory: async () => {
        set({ isLoading: true });
        try {
            const response = await api.get('/attendance/my-history');
            set({ history: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    fetchEmployeeStats: async () => {
        set({ isLoading: true });
        try {
            const response = await api.get('/dashboard/employee');
            set({ stats: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    fetchManagerStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/dashboard/manager');
            set({ stats: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch manager stats', isLoading: false });
        }
    },

    fetchAllAttendance: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/attendance/all');
            set({ allAttendance: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch all attendance', isLoading: false });
        }
    }
}));

export default useAttendanceStore;
