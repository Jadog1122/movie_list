import React from "react";
import MovieCard from "./MovieCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function MovieList({ movies, onAdd }){
    return (
        <Row>
            {movies.length === 0 ? (
                <p>NO MOVIES FOUND</p>
            ): (
                movies.map((movie) => (
                    <Col key={movie.imdbID} xs={12} sm={6} sd={4} lg={3}>    
                        <MovieCard movie={movie} onAdd={onAdd}/>
                    </Col>
                ))
            )}
        </Row>
    );
}

export default MovieList;