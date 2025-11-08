// Helper function to convert the date to human readable
// Helper function to get/display the genre names from the hardcoded genre data

// Map out the function for displaying the associated names of each genre as they relate to each podcast
/**
 * @function apiDataMapping
 * @param {podcastData<Object[]>} - Array of podcasts object data
 * @param {genreDataArray<Object[]>} - Array of genre object data
 * @returns {} - Podcast object and the titles of each associated genre
 * 
 */
export function apiDataMapping (podcastData, genres) {
    // new Map takes the returned array from the genre.map and maps the properties to a key value map making the look up for genre title by id faster
    const genreMap = new Map(genres.map(genre => [genre.id, genre.title]));
    // New map for seasons data. Season id and podcast id act as foreign key
    const newPodcastArray = podcastData.map(podcast => {
        // Access to the names associated with the genre array inside each podcast object
        //const podcastGenreArray = podcast.genres;
        //const genreNames = podcastGenreArray.map(genreId => genreDataArray.find(genre => genre.id === genreId).title);

        // Return the podcast with the genreNames 
        // Iterate every podcast object. Iterate every genreId inside the genres value. For each genre id get the mapped value/name for that genre
        const genreNames = podcast.genres.map(genreId => genreMap.get(genreId));
        const updatedReadable = lastUpdated(podcast.updated); 
        // Return the podcast and the modified versions of the mapped data
        return { ...podcast, genreNames, updatedReadable };
    });
    return newPodcastArray;
}
/**
 * 
 * @param {*} lastedUpdatedDate 
 * @returns 
 */
// Helper functions to convert the times to human readable
export function lastUpdated (lastedUpdatedDate) {
    // Modify the data data to be human readable in a last update x days ago format
    // Get the current date object
    const currentDate = new Date();
    // Convert the ISO date from the podcast array and convert it back to a date object
    const updatedDate = new Date(lastedUpdatedDate);
    // Subtract the date object millisecond times to find the difference
    const dateDiffMil = currentDate - updatedDate;
    // Convert the difference in milliseconds to min/hours/days/months/years.
    const diffSec = Math.floor(dateDiffMil / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    // Return the difference and the x time ago string for each time period
    // Refine this
    if (diffSec < 60) return 'Just Now';
    if (diffMin < 60) return `${diffMin} minute/s ago`;
    if (diffHours < 24) return `${diffHours} hour/s ago`;
    if (diffDays < 30) return `${diffDays} day/s ago`;
    if (diffMonths < 12) return `${diffMonths} month/s ago`;
    return `${diffYears} year/s ago`;
}
// Differently formatted date object for the modal view
export function updatedDate (dateString) {
    const isoString = dateString;
    const date = new Date(isoString);

    const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    return formatted;
}

//export const resetApiCall = setInterval(2 * 60 * 1000); // 120000 ms = 2 minutes, need to work on this
