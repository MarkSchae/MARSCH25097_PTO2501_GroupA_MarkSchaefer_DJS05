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
    console.log(state);
    console.log(podcast);
    const clickedPodcast = state || podcast; // Use the state object as the current clicked on podcast or fetch the podcast using params in the URL (persistant through page reload)
  
    return (
        <div className='flex flex-col gap-4 bg-gray-200 p-4'>
            <h1>
                {console.log(clickedPodcast)}
                {clickedPodcast.title}
            </h1>
        </div>
    );
}