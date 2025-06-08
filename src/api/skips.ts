import axios from 'axios';
import { mockApi } from './mockData';

const API_URL = 'http://localhost:3001/api/skips'; // Local server URL

// Check if we're in CodeSandbox environment
const isCodeSandbox = window.location.hostname.includes('codesandbox') || 
                     window.location.hostname.includes('csb.app') ||
                     process.env.NODE_ENV === 'development' && !window.location.hostname.includes('localhost');

export const fetchSkips = async (postcode?: string, area?: string) => {
    try {
        // Use mock data in CodeSandbox
        if (isCodeSandbox) {
            console.log('Using mock data for CodeSandbox demo');
            return await mockApi.getSkipsByLocation(postcode || '');
        }
        
        let url = API_URL;
        if (postcode) {
            url = `http://localhost:3001/api/skips/by-location?postcode=${postcode}&area=${area || ''}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching skips, falling back to mock data:', error);
        // Fallback to mock data if API fails
        return await mockApi.getSkipsByLocation(postcode || '');
    }
};

export const fetchAllSkips = async () => {
    try {
        // Use mock data in CodeSandbox
        if (isCodeSandbox) {
            console.log('Using mock data for CodeSandbox demo');
            return await mockApi.getSkips();
        }
        
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all skips, falling back to mock data:', error);
        // Fallback to mock data if API fails
        return await mockApi.getSkips();
    }
};