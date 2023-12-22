export const fetchCities = async (country,region) => {
    try {
        const response = await fetch(`https://namaz-vakti-api-two.vercel.app/api/cities?country=${country}&region=${region}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching cities: ${error.message}`);
    }
};
