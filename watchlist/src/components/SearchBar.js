import React, { useState } from "react";

function SearchBar({ onSearch }){
    const [query, setQuery] = useState('')//set the default state empty
    
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    }
    
    return(
        <form onSubmit={handleSearch}>
            <input 
            type="text"
            placeholder="What movies are looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}//need explain what does e means/ what is e.target.value 
            />
            <button type="submit">Search</button>
        </form>
    );
}
export default SearchBar;