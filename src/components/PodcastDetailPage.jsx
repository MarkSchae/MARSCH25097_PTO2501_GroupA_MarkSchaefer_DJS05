// Create a component that displays detailed info for the podcast that was clicked
// Use navigate to switch to the defined route
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import fetchData from "../api/fetch-data-api";
// Props passed in as a object argument here and deconstructed in the {} so as to use .map on the array
// New component that reders the styling template using the props passed by the App parent component
export default function RenderDetailsPage () {// Maybe pass the template as a children object
    const { state } = useLocation(); // Stores the current URL path as well as any objects sent via navigate (object)
    const { podcastId } = useParams(); // Returns the value in the URL @ path/:podcastId as an object
    const [podcast, setPodcast] = useState({});
    // Use state for loading wiget, starts as true and is set to false when the promise is resolved (.finally)
    const [loading, setLoading] = useState(true);
    // Use state for api error handling within the component 
    const [error, setError] = useState(null);
    // Logic to fetch the podcast for a direct URL access full page reload
    useEffect(() => {
        fetchData().then(data => {
            const podcastFromParams = data.find(data => data.id === podcastId);
            setPodcast(podcastFromParams);
        }).catch(errorMessage => setError(errorMessage.message)).finally(() => setLoading(false));
    },[podcastId]);

    // Render logic for the error catch and the loading widget
    // Keeps the data fetching and handling logic seperate from the render of the data in the child component
    if (loading) return  <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto my-4"></div>;
    if (error) return <div>Error: {error}</div>;
    // Use passed object if available, otherwise fetch
    const clickedPodcast = state || podcast; // Use the state object as the current clicked on podcast or fetch the podcast using params in the URL (persistant through page reload)
  
    return (
        <div className='flex flex-col gap-4 bg-gray-200 p-4'>
            <div className="flex flex-col gap-5 sm:grid sm:grid-cols-1 xl:grid-cols-[1fr_3fr] border-2 border-black shadow-2xl rounded-2xl">
                <div className='flex flex-col gap-4 p-5 bg-white rounded-2xl h-full transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-2xl shadow-gray-500'
                    key={clickedPodcast.id}>
                    <img src={clickedPodcast.image} alt={clickedPodcast.title} />

                </div> 
                <div className="flex flex-col gap-4">
                    <div className="text-2xl"> {podcast.title} </div>
                    <div>{clickedPodcast.description}</div>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className='flex flex-col gap-1.5 w-[50%]'>
                            <div className="text-2xl">Genres</div>
                            <div className="flex flex-row gap-10">
                                {clickedPodcast.genreNames.map(genreName => (<div key={genreName} className='bg-gray-300 rounded shadow shadow-black p-1'>{genreName}</div>))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="text-2xl">Last Updated</div>
                            <div> {clickedPodcast.updatedReadable} </div>
                        </div> 
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex flex-col gap-1.5 w-[50%]">
                            <div className="text-2xl">Total Seasons</div>
                            <div>{clickedPodcast.seasons} </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="text-2xl">Total Episodes</div>
                            <div>{clickedPodcast.seasons} </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <h1>Current Seasons</h1>
                <select value={seasons.currentSeason}>
                    <option value="">None Selected</option>
                    {seasons.map(season => <option key={season.id} value={season.title}>{season.title}</option>)}
                </select>
            </div>
        </div>
    );
}