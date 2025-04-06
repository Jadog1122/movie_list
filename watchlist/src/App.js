import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import WatchList from "./components/WatchList";

function App(){
    const [movie, setMovie] = useState([]);

    //set up useState without storing into localStorage
    // const [savedMovie, setSavedMovie] = useState([]);

    const [savedMovie, setSavedMovie] = useState(() => {
        const stored = localStorage.getItem('watchlist');
        return stored ? JSON.parse(stored) : []
        //if empty stored, then set savedMovie as empty []
        //localStorage only accepts strings
    })
    
    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(savedMovie))
    }, [savedMovie]);

    const apikey = process.env.REACT_APP_OMDB_KEY;// step: Setting environmental variable for storing private info

    const handleSearch = async(query) => {
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=${apikey}&s=${query}`
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
    const handleClearSavedMovie = () => {
        setSavedMovie([]);
        localStorage.removeItem('watchlist');
    }
    return(
        <div>
            {/* <Header /> */}
            <MovieList movies={movie} onAdd={handleAddToWatchList}/>
            <WatchList savedmovies={savedMovie} onRemove={handleRemoveFromWatchList} clearSavedMovies={handleClearSavedMovie}/>
            <SearchBar onSearch={handleSearch}/>
            
        </div>
    );
}

export default App;
