/**
 * Fetches data from external API
 * @async 
 * @function fetchData
 * @returns {Promise<Object[]>} - Async function that resolves to return a array of data objects
 * @throws {Error} - Error message and fallback behaviour incase of network etc error
 */
export default async function fetchData() { // Remember that extra security checks can also be made for api's even on the frontend
    // Try catch for the error handling
    try {
        // Fetch data from the api
        const response = await fetch('https://podcast-api.netlify.app/'); // Can pass url and make this function dynamic
        // Error
        if(!response.ok) {
            throw new Error(`There was an error ${response.status}`);
        }
        const podcastData = await response.json();
        return podcastData;
    } catch (error) {
        console.log('There was an error fetching the podcast data', error.message);
        throw new Error(`Failed to fetch podcast data: ${error.message}`);  
    }
}