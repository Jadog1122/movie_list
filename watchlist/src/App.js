import React, { useState } from "react";

import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";

function App(){
    const [movie, setMovie] = useState([]);

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
    
    
    return(
        <div>
            {/* <Header /> */}
            <MovieList movies={movie}/>
            <SearchBar onSearch={handleSearch}/>
            
        </div>
    );
}

export default App;
