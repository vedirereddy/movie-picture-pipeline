import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Direct backend LoadBalancer connection
    const API_URL = 'http://a679c5483e1b54697ad3a5b56da7344f-734522383.us-east-1.elb.amazonaws.com';

    axios.get(`${API_URL}/movies`).then((response) => {
      const movieList = Array.isArray(response.data) ? response.data : response.data.movies;
      setMovies(movieList || []);
    }).catch((error) => {
      console.error("Error fetching movies:", error);
    });
  }, []);

  return (
    <ul>
      {movies?.map((movie) => (
        <li className="movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
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