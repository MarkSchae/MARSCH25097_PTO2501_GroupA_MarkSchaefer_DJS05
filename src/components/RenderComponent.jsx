import React, { useState } from 'react';
import fetchData from '../api/fetch-data-api';
import { apiDataMapping } from '../utils/helper';
import { genres } from '../utils/genre-data';
import { Routes, Route } from 'react-router-dom';

/**
 * Displays a grid populated by data fetched from an API
 *  The data is podcasts objects
 * @param {object} props
 * @param {object[]} props.podcastData - array of podcast objects
 * @param {string} props.podcastData[].image - URL of the image
 * @param {string} props.podcastData[].title - Title of the podcast
 * @param {number} props.podcastData[].seasons - Number of seasons for the podcast
 * @param {string[]} props.podcastData[].genreNames - Names of the genres the podcast belongs to
 * @param {string} props.podcastData[].updated - Formatted date of last update for the podcast data
 * @returns {JSX.Element} React element displaying the podcast data
 */
// Parent component creates the props to pass to the child component for rendering
function App () { // First letter capital indicates React component
  // Set the state
  // Initialize a empy array which contains the initial data and the function/behaviour for the state/hook
  // Destructure array
  const [podcoastArray, setPodcastData] = React.useState([]);
  // Search state
  const [userSearchInput, setSearch] = React.useState('');
  // Sort state
  const [sortType, setSortType] = useState('title'); // default sort by title?
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Global for use in multiple functions
  // Genre filter
   const [selectedGenre, setSelectedGenre] = useState('all'); // For genre filter input
  // Use state for loading wiget, starts as true and is set to false when the promise is resolved (.finally)
  const [loading, setLoading] = React.useState(true);
  // Use state for api error handling within the component 
  const [error, setError] = React.useState(null);

  // Filter the podcasts data by title where the title.includes(userinput)
  const filteredBySearch = userSearchInput
    ? podcoastArray.filter(podcast =>
        podcast.title.toLowerCase().includes(userSearchInput.toLowerCase())
      )
    : podcoastArray;

  // Filter by genre
  const filteredByGenre = selectedGenre === 'all' ? filteredBySearch
  : filteredBySearch.filter(podcast => podcast.genreNames.some(genreName => genreName === selectedGenre));
  // Sort function
  const sortedPodcasts = userSearchInput ? [...filteredByGenre].sort((podcastA, podcastB) => { // Compares and return 1, -1, 0 to order items
    switch (sortType) {
      case 'title-asc':
      return podcastA.title.localeCompare(podcastB.title); // For proper string comparison including case
      case 'title-desc':
      return podcastB.title.localeCompare(podcastA.title);
      case 'updated-newest':
      return new Date(podcastB.updated) - new Date(podcastA.updated);
      case 'updated-oldest':
      return new Date(podcastA.updated) - new Date(podcastB.updated);
      default:
      return 0;
    }
  }) // If user input exists then return the search filter and the sort filter
    // If there is not user input then return the original array sorted by sort option
  : [...filteredByGenre].sort((podcastA, podcastB) => { // Compares and return 1, -1, 0 to order items
      switch (sortType) {
        case 'title-asc':
        return podcastA.title.localeCompare(podcastB.title); // For proper string comparison including case
        case 'title-desc':
        return podcastB.title.localeCompare(podcastA.title);
        case 'updated-newest':
        return new Date(podcastB.updated) - new Date(podcastA.updated);
        case 'updated-oldest':
        return new Date(podcastA.updated) - new Date(podcastB.updated);
        default:
        return 0;
      }
    });

  // Pagination (10 pages)
  const totalPages = Math.ceil(sortedPodcasts.length / itemsPerPage);// Rounded up to get total pages
  const startIndex = (currentPage - 1) * itemsPerPage;// Getting the starting and ending index for the slice
  const endIndex = startIndex + itemsPerPage;
  const paginatedPodcasts = sortedPodcasts.slice(startIndex, endIndex);// Returning a portion of the array using the index
  // React use effect runs once for actions like fetching data from a api, then runs again as indicated(polling)
  /**
   * React effect hook that fetches and processes podcast data from an external API.
   * This effect is triggered to re-fetch the API data every 2min.
   * Once data is retrieved, it is mapped and formatted using before being stored in the state.
   * The effect also handles potential errors by updating the error state and displaying the error message.
   * @function useEffect
   * @fires fetchData - Asynchronous API request to retrieve podcast data.
   * @fires apiDataMapping - Mapps genre data to podcast data.
   * @listens resetApiCall - Triggers the re-fetch (polling).
   * @returns {void}
   */
  React.useEffect(() => {
    fetchData().then(data => {
      const podcoastArray = apiDataMapping(data, genres);
      setPodcastData(podcoastArray)
    }).catch(errorMessage => setError(errorMessage.message)).finally(() => setLoading(false));
  },[]);// Run again on polling of 2min or somthing, should use a data variable to trigger this actually
  // resetApiCall, needs work (no callback)
  // Render logic for the error catch and the loading widget inside the parent component
  // Keeps the data fetching and handling logic seperate from the render of the data in the child component
  if (loading) return  <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto my-4"></div>;
  if (error) return <div>Error: {error}</div>;

  // Pass the filtered array or the full array to the child render component
  const podcastDataToRender = paginatedPodcasts; // full array if search input is empty
  // Some of the jsx html needs to be here so that the child component does not deal with any behaviour and data
  return (
    <div className="p-4">
      <select
        value={selectedGenre}
        onChange={event => { setSelectedGenre(event.target.value); setCurrentPage(1); }} // reset page on filter change
        className='border p-2 rounded mb-4'
      >
        <option value='all'>All Genres</option>
        {genres.map(genre => <option key={genre.id} value={genre.title}>{genre.title}</option>)}
      </select>
      <input
        type='text'
        value={userSearchInput} // Inputs the search input as the value
        onChange={event => setSearch(event.target.value)} // When the input field changes run the setSearch with the new value/input
        placeholder='Search'
        className='border p-2 rounded w-full mb-4'
      />
      <div className='flex gap-4 mb-4'>
        <label>
          A→Z
          <input
            type='radio'
            name='sort'
            value='title-asc'// Value is the string used in the set state
            checked={sortType === 'title-asc'}// Tells React that the state is the UI render too 
            onChange={event => setSortType(event.target.value)}
          />
        </label>
        <label>
          Title Z→A
          <input
            type='radio'
            name='sort'
            value='title-desc'
            checked={sortType === 'title-desc'}
            onChange={event => setSortType(event.target.value)}
          />
        </label>
        <label>
          Newest
          <input
            type='radio'
            name='sort'
            value='updated-newest'
            checked={sortType === 'updated-newest'}
            onChange={event => setSortType(event.target.value)}
          /> 
        </label>
        <label>
          Oldest
          <input
            type='radio'
            name='sort'
            value='updated-oldest'
            checked={sortType === 'updated-oldest'}
            onChange={event => setSortType(event.target.value)}
          /> 
        </label>

      <div className='flex gap-2 mt-4'>
        {Array.from({ length: totalPages }, (element, i) => i + 1).map(page => (// Array for page numbers display
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
      </div>
      <Routes>
        <Route path="/" element={<RenderData podcastData={podcastDataToRender} />} />
      </Routes>
    </div>
  );
}

export default App
// Props passed in as a object argument here and deconstructed in the {} so as to use .map on the array
// New component that reders the styling template using the props passed by the App parent component
function RenderData ({ podcastData }) {
  return (
    <div className='flex flex-col gap-4 bg-gray-200 p-4'>
      <div className='flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-4'>
      {podcastData.map(podcast => (
        <div className='flex flex-col gap-4 p-3.5 bg-white rounded h-full' key={podcast.id}>
          <img src={podcast.image} alt={podcast.title} />
          <div className='flex-1'> {podcast.title} </div>
          <div> Seasons: {podcast.seasons} </div>
          <div className='flex flex-row justify-between'>
            {podcast.genreNames.map(genreName => (<div key={genreName} className='bg-gray-300 rounded shadow shadow-black p-1'>{genreName}</div>))}
          </div>
          <div> {podcast.updatedReadable} </div>
        </div> 
      ))}
      </div>
    </div>
  );
}