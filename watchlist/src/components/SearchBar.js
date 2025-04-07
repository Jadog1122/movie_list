import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SearchBar({ onSearch }){
    const [query, setQuery] = useState('')//set the default state empty
    
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    }
    
    return(
        <Form onSubmit={handleSearch} className="d-flex">
            {/* d-flex means display: flex  */}
            <Form.Control 
            type="text"
            placeholder="What movies are looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}//need explain what does e means/ what is e.target.value 
            className="me-3"/>
            <Button type="submit" variant="primary">Search</Button>
        </Form>
    );
}
export default SearchBar;