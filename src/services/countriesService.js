import axios from "axios";

export const fetchCountries = async () => {
    try {
        const response = await axios.get(
            `https://namaz-vakti-api-two.vercel.app/api/countries`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching countries: " + error.message);
    }
};
