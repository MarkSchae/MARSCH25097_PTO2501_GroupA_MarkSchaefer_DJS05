export default function RenderSeason ({ season }) {
    // If we need this to persist on reload, set useParams
    return (
        <div className="flex flex-col gap-2.5 bg-white border-2 border-gray-400 p-4">
            <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-5">
                <img className="w-20 rounded-2xl" src={season.image} alt={season.title} />
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl">{season.title}</h1>
                    <div>Description that i cant find</div>
                    <div className="flex flex-row gap-2">
                        <div>{season.episodes.length}</div>
                        <div className="text-[10px] flex items-center opacity-50">⚫</div>
                        <div>Release date that i cannot find</div>
                    </div>
                </div>
            </div>
            {season.episodes.map(episode => 
            <div className="flex flex-col gap-2.5 bg-white">
                <div className="flex flex-col p-2 border-2 border-gray-500 bg-gray-400 rounded-2xl sm:grid sm:grid-cols-[auto_1fr] gap-5">
                    <img className="w-20 h-20 rounded-2xl bg-gray-300 border-2 border-gray-600" src={episode.image} alt="" />
                    <div className="flex flex-col gap-5">
                        <div>Episode:{episode.episode} {episode.title}</div>
                        <div>{episode.description}</div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}