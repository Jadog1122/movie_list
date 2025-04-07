import React from "react";
import MovieCard from "./MovieCard";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';
// import CardBody from "react-bootstrap/esm/CardBody";
const WatchList = ({savedmovies, onRemove, clearSavedMovies}) => {
    return(
        <Card className="mt-5">
            <Card.Body>
                <Card.Title>My WatchList</Card.Title>
            
                {savedmovies.length === 0 ?
                (<p>There is no saved movies yet. Wanna Add some, start searching!</p>) :
                (savedmovies.map((movie) => 
                    <MovieCard movie={movie} onRemove={onRemove}/>
                ))

                }
                <Button onClick={clearSavedMovies} variant="danger">Clear WatchList</Button>
            </Card.Body>
                
        </Card>
    );
}

export default WatchList;