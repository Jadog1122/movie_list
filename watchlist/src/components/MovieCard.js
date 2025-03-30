import React from "react";

const MovieCard = ({ movie }) => {
    return(
        <div style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
            <img src={movie.Poster} alt={movie.Title} width="150"/>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
        </div>
    );
}

export default MovieCard;