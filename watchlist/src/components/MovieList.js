import React from "react";
import MovieCard from "./MovieCard";
function MovieList({ movies, onAdd }){
    return (
        <div>
            {movies.length === 0 ? (
                <p>NO MOVIES FOUND</p>
            ): (
                movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.imdbID} onAdd={onAdd}/>
                ))
            )}
        </div>
    );
}

export default MovieList;