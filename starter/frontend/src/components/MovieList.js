import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_MOVIE_API_URL}/movies`)
      .then((response) => {
        // Safely extract movies whether response data is an array or an object containing movies
        const movieList = Array.isArray(response.data) 
          ? response.data 
          : response.data.movies;
        
        setMovies(movieList || []);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]);
      });
  }, []);

  return (
    <ul>
      {movies?.map((movie) => (
        <li className="movieItem" key={movie.id || movie._id} onClick={() => onMovieClick(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;