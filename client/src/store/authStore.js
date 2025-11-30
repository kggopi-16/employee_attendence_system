import { create } from 'zustand';
import api from '../api/axios';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, ...userData } = response.data;

            localStorage.setItem('token', token);
            set({
                user: userData,
                token,
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || 'Login failed'
            });
            return false;
        }
    },

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/register', userData);
            const { token, ...user } = response.data;

            localStorage.setItem('token', token);
            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || 'Registration failed'
            });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await api.get('/auth/me');
            set({ user: response.data, isAuthenticated: true });
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, isAuthenticated: false });
        }
    },
}));

export default useAuthStore;
