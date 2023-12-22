import axios from 'axios';
import {getLocalStorageItem} from "@/services/localStorageService.ts";

const API_BASE_URL = 'https://namaz-vakti-api-two.vercel.app';

export const getPrayerTimes = async () => {
    const days = 3;
    const timezoneOffset = 180;
    const calculationMethod = 'Turkey';


    const country = getLocalStorageItem('selectedCountry') ?? 'Turkey';
    const region = getLocalStorageItem('selectedRegion') ?? 'İstanbul';
    const city = getLocalStorageItem('selectedCity') ?? 'İstanbul';


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
