// Create a component that displays detailed info for the podcast that was clicked
// Use navigate to switch to the defined route
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import fetchData from "../api/fetch-data-api";
import { lastUpdated } from "../utils/helper";
import RenderSeason from "./RenderSeason";
// Props passed in as a object argument here and deconstructed in the {} so as to use .map on the array
// New component that reders the styling template using the props passed by the App parent component
export default function RenderDetailsPage () {// Maybe pass the template as a children object
    const { state } = useLocation(); // Stores the current URL path as well as any objects sent via navigate (object)
    const { podcastId } = useParams(); // Returns the value in the URL @ path/:podcastId as an object
    const [podcast, setPodcast] = useState({});
    const [selectedSeason, setSeason] = useState(1);
    //const [setPodcastSeasonsData, setPodcastSeasons] = useState([]);
    // Use state for loading wiget, starts as true and is set to false when the promise is resolved (.finally)
    const [loading, setLoading] = useState(true);
    // Use state for api error handling within the component 
    const [error, setError] = useState(null);
    // Logic to fetch the podcast for a direct URL access full page reload
    // Requirement was to have this async, React does not allow, define async then call at the end
    useEffect(() => {
        fetchData(podcastId).then(data => {
            const podcastFromParams = data;
            setPodcast(podcastFromParams);
        }).catch(errorMessage => setError(errorMessage.message)).finally(() => setLoading(false));
    },[podcastId]);

    // Render logic for the error catch and the loading widget
    // Keeps the data fetching and handling logic seperate from the render of the data in the child component
    if (loading) return  <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto my-4"></div>;
    if (error) return <div>Error: {error}</div>;
    // Use passed object if available, otherwise fetch
    //const clickedPodcast = state || podcast; // Use the state object as the current clicked on podcast or fetch the podcast using params in the URL (persistant through page reload)
  
    return (
        <div className='flex flex-col gap-4 bg-gray-200 p-4'>
            <div className="flex flex-col gap-5 sm:grid sm:grid-cols-1 xl:grid-cols-[1fr_3fr] border-2 border-black shadow-2xl rounded-2xl">
                <div className='flex flex-col gap-4 p-5 bg-white rounded-2xl h-full transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-2xl shadow-gray-500'
                    key={podcast.id}>
                    <img src={podcast.image} alt={podcast.title} />
                </div> 
                <div className="flex flex-col gap-4">
                    <div className="text-2xl"> {podcast.title} </div>
                    <div>{podcast.description}</div>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className='flex flex-col gap-1.5 w-[50%]'>
                            <div className="text-2xl">Genres</div>
                            <div className="flex flex-row gap-10">
                                {(state ? state.genreNames : podcast.genres.splice(2)).map(genreName => (<div key={genreName} className='bg-gray-300 rounded shadow shadow-black p-1'>{genreName}</div>))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="text-2xl">Last Updated</div>
                            <div> {state ? state.updatedReadable : lastUpdated(podcast.updated)} </div>
                        </div> 
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex flex-col gap-1.5 w-[50%]">
                            <div className="text-2xl">Total Seasons</div>
                            <div>{podcast.seasons.length} </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="text-2xl">Total Episodes</div>
                            <div>{podcast.seasons.reduce((totalEpisodes, season) => {
                                return totalEpisodes + season.episodes.length
                            }, 0)} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <h1>Season:{selectedSeason}</h1>
                <select value={selectedSeason}
                    onChange={event => { setSeason(parseInt(event.target.value)); }}>
                    <option value={selectedSeason}>Season:{selectedSeason}</option>
                    {podcast.seasons.map(season => <option key={season.id} value={season.season}>Season:{season.season}</option>)}
                </select>
            </div>
            <RenderSeason season={podcast.seasons.find(season => season.season === selectedSeason)} />
        </div>
    );
}