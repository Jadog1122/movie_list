import React, { useState } from "react";

import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import WatchList from "./components/WatchList";

function App(){
    const [movie, setMovie] = useState([]);
    const [savedMovie, setSavedMovie] = useState([]);

    const handleSearch = async(query) => {
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=6c6b62b9&s=${query}`
        );
        
        const data = await res.json();
        console.log(data)
        if (!data.Search){
            setMovie([]);
        }else{
            setMovie(data.Search)
        }
    }
    const handleAddToWatchList = (movie) => {
        if(!savedMovie.some((m) => m.imdbID === movie.imdbID)){
            setSavedMovie([...savedMovie, movie])
        }
    }
    const handleRemoveFromWatchList = (movie) => {
        setSavedMovie((prevList) => 
          prevList.filter((m) => m.imdbID !== movie.imdbID)  
        );
    }
    return(
        <div>
            {/* <Header /> */}
            <MovieList movies={movie} onAdd={handleAddToWatchList}/>
            <WatchList savedmovies={savedMovie} onRemove={handleRemoveFromWatchList}/>
            <SearchBar onSearch={handleSearch}/>
            
        </div>
    );
}

export default App;
