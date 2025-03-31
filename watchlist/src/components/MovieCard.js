import React from "react";

const MovieCard = ({ movie, onAdd, onRemove }) => {
    return(
        <div style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
            <img src={movie.Poster} alt={movie.Title} width="150"/>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {/* in the case for reuse in different situation, we use conditional rendering */}
            {/* <button onClick={() => onAdd(movie)}>Add To WatchList</button> */}
            {onAdd && <button onClick={() => onAdd(movie)}>Add To WatchList</button>}
            {onRemove && <button onClick={() => onRemove(movie)}>Remove From WatchList</button>}
        </div>
    );
}

export default MovieCard;