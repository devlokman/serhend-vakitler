export const fetchRegions = async (countryCode) => {
    try {
        const response = await fetch(`https://namaz-vakti-api-two.vercel.app/api/regions?country=${countryCode}`);
        if (!response.ok) {
            throw new Error('Failed to fetch regions');
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching regions: ${error.message}`);
    }
};
