
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchRegions = async (countryCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/regions?country=${countryCode}`);
        if (!response.ok) {
            throw new Error('Failed to fetch regions');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching regions: ${error.message}`);
    }
};
