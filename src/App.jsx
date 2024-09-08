import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css'

const App = () => {

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')

  const searchMovies = async () => {
    if(searchTerm.trim() !== ''){
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`)
      const data = await response.json()
      setMovies(data.results)
      // console.log(data);
    }
  }

  const fetchMoviesByGenre = async (genreId) => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    const data = await response.json();
    setMovies(data.results)
  }

  const fetchGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json()
    setGenres(data.genres)
    // console.log(data);
  }

  const fetchLatestMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    const data = await response.json()
    setMovies(data.results)
  }

  useEffect(() => {
    fetchGenres()
    fetchLatestMovies()
  },[])

  useEffect(() => {
    if(selectedGenre){
      fetchMoviesByGenre(selectedGenre);
    }
  },[selectedGenre])

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div className='app-container'>
            <h1 className="app-title">Movie App</h1>
            <div className="search-container">
              <input 
                type="text" 
                placeholder='Search for a movie...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='search-input'
              />
              <button onClick={searchMovies} className='search-button'>Search</button>
            </div>

            <div className="genre-select">
              <select onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            <MovieList movies={movies} />
          </div>
        } />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </Router>
  )
}

export default App