import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchCountries = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/countries`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching countries: " + error.message);
    }
};
