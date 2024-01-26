import React from 'react'
import './movieList.css'
import MovieItem from '../MovieItem/MovieItem'

const MovieList = (props) => {
  const { movies } = props
  const pageMovies = movies.results || []
  const noResultsFound = pageMovies.length === 0

  return (
    <div className="movie-list">
      {noResultsFound ? (
        <p>No movies found :( </p>
      ) : (
        pageMovies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
      )}
    </div>
  )
}

export default MovieList
