
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchCities = async (country,region) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cities?country=${country}&region=${region}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching cities: ${error.message}`);
    }
};
