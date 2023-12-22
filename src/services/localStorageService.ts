export const setLocalStorageItem = (key: string, value: string) => {
    localStorage.setItem(key,
        value);
};

// Function to retrieve a value from local storage based on the key
export const getLocalStorageItem = (key: string): string | null => {
    return localStorage.getItem(key);
};