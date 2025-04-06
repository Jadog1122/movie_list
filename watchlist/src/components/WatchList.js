import React from "react";
import MovieCard from "./MovieCard";

const WatchList = ({savedmovies, onRemove, clearSavedMovies}) => {
    return(
        <div>
            <h2>My Movie Watch List</h2>
            {savedmovies.length === 0 ?
            (<p>There is no saved movies yet. Wanna Add some, start searching!</p>) :
            (savedmovies.map((movie) => 
                <MovieCard movie={movie} onRemove={onRemove}/>
            ))

        }
        <button onClick={clearSavedMovies}>Clear WatchList</button>
        </div>
    );
}

export default WatchList;