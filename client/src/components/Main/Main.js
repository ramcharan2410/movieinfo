import React, { useEffect } from 'react'
import MovieList from '../MovieList/MovieList'

const Main = (props) => {
  const { movies, scrollToTop } = props

  useEffect(() => {
    scrollToTop()
  }, [movies, scrollToTop])

  return (
    <div className="main">
      <div className="main-content">Main</div>
      <MovieList movies={movies} />
    </div>
  )
}

export default Main
