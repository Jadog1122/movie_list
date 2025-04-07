import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import WatchList from "./components/WatchList";
//step: apply to Bootstrap!
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';


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

    const [showSuccess, setShowSuccess] = useState(false);
    const [addedMovie, setAddedMovie] = useState(null);

    
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
            setSavedMovie([...savedMovie, movie]);
            setAddedMovie(movie);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setAddedMovie(null);
            }, 3000)
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
    return (
        <Container className="my-4">
          {/* Fixed Success Alert */}
          {showSuccess && addedMovie && (
            <div style={{ position: 'fixed', top: '1rem', left: 0, right: 0, zIndex: 9999 }}>
              <Container className="d-flex justify-content-center">
                <Alert
                  variant="success"
                  onClose={() => setShowSuccess(false)}
                  dismissible
                  className="w-auto shadow"
                >
                  ✅ <strong>{addedMovie.Title}</strong> was added to your watchlist!
                </Alert>
              </Container>
            </div>
          )}
      
          {/* Header */}
          <h1 className="text-center mb-4">🎬 My Movie WatchList</h1>
      
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
      
          {/* Main Content */}
          <Row className="mt-4">
            <Col md={8}>
              <h2>Search Results</h2>
              <MovieList movies={movie} onAdd={handleAddToWatchList} />
            </Col>
      
            <Col md={4}>
              <WatchList
                savedmovies={savedMovie}
                onRemove={handleRemoveFromWatchList}
                clearSavedMovies={handleClearSavedMovie}
              />
            </Col>
          </Row>
        </Container>
      );
    }

export default App;
