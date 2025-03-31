import React from "react";
import MovieCard from "./MovieCard";

const WatchList = ({savedmovies, onRemove}) => {
    return(
        <div>
            <h2>My Movie Watch List</h2>
            {savedmovies.length === 0 ?
            (<p>There is no saved movies yet. Wanna Add some, start searching!</p>) :
            (savedmovies.map((movie) => 
                <MovieCard movie={movie} onRemove={onRemove}/>
            ))

        }
        </div>
    );
}

export default WatchList;