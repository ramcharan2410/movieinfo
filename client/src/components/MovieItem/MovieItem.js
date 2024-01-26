import React from 'react'
import './movieItem.css'
const MovieItem = (props) => {
  const { movie } = props
  const { poster_path, title, vote_average, overview } = movie
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
  // console.log(movie)
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
    <div className="movie-item">
      <img src={IMGPATH + poster_path} alt={title} />
      <div className="movie-info">
        <h3 title={title}>{title}</h3>
        <span class={getClassByRate(vote_average)}>{vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview:</h3>
        {overview}
      </div>
    </div>
  )
}

export default MovieItem
