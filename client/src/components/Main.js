import React, { useEffect } from 'react'
import MovieList from './MovieList'

const Main = (props) => {
  const { movies, scrollToTop, searchValue, selectedCategory } = props

  useEffect(() => {
    scrollToTop()
  }, [movies, scrollToTop])

  const renderMainContent = () => {
    if (searchValue !== '') {
      return (
        <div className="main-content">Search results for '{searchValue}'</div>
      )
    } else if (selectedCategory !== '') {
      return (
        <div className="main-content">
          Exploring '{selectedCategory}' movies
        </div>
      )
    } else {
      return <div className="main-content">Explore and find movies...</div>
    }
  }

  return (
    <div className="main-container">
      {renderMainContent()}
      <MovieList movies={movies} />
    </div>
  )
}

export default Main
