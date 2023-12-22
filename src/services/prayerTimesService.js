import axios from 'axios';

const API_BASE_URL = 'https://namaz-vakti-api-two.vercel.app';

export const getPrayerTimes = async () => {
    const country = 'Turkey';
    const region = 'Ankara';
    const city = 'Ankara';
    const days = 3;
    const timezoneOffset = 180;
    const calculationMethod = 'Turkey';

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const date = currentDate.toISOString().split('T')[0];

    const apiUrl = `${API_BASE_URL}/api/timesFromPlace?country=${country}&region=${region}&city=${city}&date=${date}&days=${days}&timezoneOffset=${timezoneOffset}&calculationMethod=${calculationMethod}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        throw error;
    }
};
