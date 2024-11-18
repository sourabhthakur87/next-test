export function getDataFromSessionStorage(key) {
    // Check if session storage is supported
    if (typeof (Storage) !== "undefined") {
        // Retrieve data from session storage
        let data = sessionStorage.getItem(key);
        // Parse JSON data if needed
        try {
            return JSON.parse(data);
        } catch (e) {
            return data; // Return as is if not JSON
        }
    } else {
        console.error("Session storage is not supported.");
        return null;
    }
}
