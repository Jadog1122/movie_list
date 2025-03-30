import React from "react";
import MovieCard from "./MovieCard";
function MovieList({ movies }){
    return (
        <div>
            {movies.length === 0 ? (
                <p>NO MOVIES FOUND</p>
            ): (
                movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.imdbID}/>
                ))
            )}
        </div>
    );
}

export default MovieList;