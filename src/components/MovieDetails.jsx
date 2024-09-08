import React, { useEffect, useState } from 'react'
import './MovieDetails.css'
import { Link, useParams } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {

  const {id} = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [trailerKey, setTrailerKey] = useState('')

  const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`);
    const data = await response.json();
    setMovieDetails(data);

    const trailer = data.videos.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');
    setTrailerKey(trailer ? trailer.key : '');
  };
  
  useEffect(() => {
    fetchMovieDetails(id)
  }, [id]);

  if(!movieDetails){
    return <h2>Loading...</h2>
  }

  return (
    <div className='movie-details-container'>
      <h1 className="movie-details-title">{movieDetails.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`} alt={movieDetails.title} className='movie-details-poster' />

      <p className='movie-overview'>{movieDetails.overview}</p>
      <h4 className='movie-genres'>Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</h4>

      <h4 className='movie-cast'>Cast:</h4>
      <ul className="movie-cast-list">
        {movieDetails.credits?.cast.slice(0, 5).map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>

      {
        trailerKey ? (
          <div className="trailer-container">
            <h3>Watch Trailer</h3>
            <iframe 
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
              title='Movie Trailer'
              className='movie-trailer'
            ></iframe>
          </div>
        ) : (
          <p>No trailer available.</p>
        )
      }

      <Link to='/' className='back-home-link'>Back to Home</Link>
    </div>
  )
}

export default MovieDetails