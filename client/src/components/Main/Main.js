import React from 'react'
import MovieList from '../MovieList/MovieList'
const Main = (props) => {
  const { movies } = props
  return (
    <div>
      Main
      <MovieList movies={movies} />
    </div>
  )
}

export default Main
