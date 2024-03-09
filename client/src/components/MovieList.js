import React from 'react'
import MovieItem from './MovieItem'

const MovieList = (props) => {
  const { movies } = props
  const pageMovies = movies.results || []
  const noResultsFound = pageMovies.length === 0

  return (
    <div className="movielist-container">
      {noResultsFound ? (
        <p className="no-movies-found">No movies found :( </p>
      ) : (
        pageMovies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
      )}
    </div>
  )
}

export default MovieList
