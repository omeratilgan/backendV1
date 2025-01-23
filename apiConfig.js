import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'android' 
    ? 'http://10.0.2.2:3000'  // Android Emulator için
    : Platform.OS === 'ios'
        ? 'http://localhost:3000' // iOS Simulator için
        : 'http://YOUR_ACTUAL_IP:3000'; // Gerçek cihaz için

const api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Hata yakalama için interceptor ekleyin
api.interceptors.response.use(
    response => response,
    error => {
        console.log('API Error:', error);
        console.log('Error Config:', error.config);
        console.log('Error Message:', error.message);
        return Promise.reject(error);
    }
);

export default api; 