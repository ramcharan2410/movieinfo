import React, { useState } from 'react'
import './movieItem.css'

const MovieItem = (props) => {
  const { movie } = props
  const { poster_path, title, vote_average, overview } = movie
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
  const [isHovered, setIsHovered] = useState(false)

  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return 'green'
    } else if (vote >= 5) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  return (
    <div
      className="movie-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-img">
        <img src={IMGPATH + poster_path} alt={title} />
        {isHovered && (
          <div className="movie-info">
            <p className="movie-title" title={title}>
              {title}
            </p>
            <span className={getClassByRate(vote_average)}>{vote_average}</span>
            <h3>Overview:</h3>
            {overview}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieItem
