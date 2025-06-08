import axios from 'axios';

const API_URL = 'http://localhost:3001/api/skips'; // Local server URL

export const fetchSkips = async (postcode?: string, area?: string) => {
    try {
        let url = API_URL;
        if (postcode) {
            url = `http://localhost:3001/api/skips/by-location?postcode=${postcode}&area=${area || ''}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching skips:', error);
        throw error;
    }
};

export const fetchAllSkips = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all skips:', error);
        throw error;
    }
};