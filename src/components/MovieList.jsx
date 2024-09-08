import React from 'react'
import './MovieList.css'
import { Link } from 'react-router-dom'


const MovieList = ({ movies }) => {
  return (
    <div className='movie-list'>
      {
        movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} className='movie-poster' />
            <h3 className='movie-title'>{movie.title}</h3>
          </Link>
        ))
      }
    </div>
  )
}

export default MovieList