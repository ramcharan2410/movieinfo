import React, { useEffect } from 'react'
import MovieList from '../MovieList/MovieList'
import './main.css'
const Main = (props) => {
  const { selectedCategory, movies, scrollToTop ,userName} = props

  useEffect(() => {
    scrollToTop()
  }, [movies, scrollToTop])

  return (
    <div className="main">
      <div className="main-content">
        Main
      </div>
      <MovieList movies={movies} />
    </div>
  )
}

export default Main
