import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
const MovieCard = ({ movie, onAdd, onRemove }) => {
    return(
        <Card className="mb-3 h-100 d-flex flex-column">
            <Card.Img src={movie.Poster} alt={movie.Title} width="150"/>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-truncate">{movie.Title}</Card.Title>
                <Card.Text>{movie.Year}</Card.Text>
                {/* in the case for reuse in different situation, we use conditional rendering */}
                {/* <button onClick={() => onAdd(movie)}>Add To WatchList</button> */}
                {onAdd && <Button onClick={() => onAdd(movie)} >Add To WatchList</Button>}
                {onRemove && <Button onClick={() => onRemove(movie)} variant="warning">Remove From WatchList</Button>}
                
            </Card.Body>    
                
        </Card>
    );
}

export default MovieCard;