import React, { useState } from 'react'

const DataItem = ({ data }) => {
  const { poster_path, name = "", title = "", vote_average, overview } = data
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
      className="dataitem-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="dataitem-img">
        <img src={IMGPATH + poster_path} alt={title === "" ? name : title} />
        {isHovered && (
          <div className="dataitem-info">
            <p className="dataitem-title" title={title === "" ? name : title}>
              {title === "" ? name : title}
            </p>
            <span className={getClassByRate(vote_average)}>{vote_average}</span>
            <h3>Overview:</h3>
            <p className="overview">{overview}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataItem
