import React from 'react'
import './header.css'

const Header = (props) => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchValue,
    setSearchValue,
    getMovies,
    setCurrentPage,
  } = props
  const apiKey = process.env.REACT_APP_API_KEY
  const apiUrl = process.env.REACT_APP_API_URL
  const urls = {
    DISCOVER: `${apiUrl}discover/movie?api_key=${apiKey}&page=1`,
    IMGPATH: 'https://image.tmdb.org/t/p/w1280',
    SEARCHAPI: `${apiUrl}search/movie?api_key=${apiKey}&query=`,
    NOWPLAYING: `${apiUrl}movie/now_playing?language=en-US&api_key=${apiKey}&page=1`,
    POPULAR: `${apiUrl}movie/popular?language=en-US&api_key=${apiKey}&page=1`,
    TOPRATED: `${apiUrl}movie/top_rated?language=en-US&api_key=${apiKey}&page=1`,
    UPCOMING: `${apiUrl}movie/upcoming?language=en-US&api_key=${apiKey}&page=1`,
  }
  const {
    DISCOVER,
    IMGPATH,
    SEARCHAPI,
    NOWPLAYING,
    POPULAR,
    TOPRATED,
    UPCOMING,
  } = urls

  const handleCategoryChange = async (e) => {
    setSelectedCategory(e.target.value)
    if (selectedCategory === '') {
      await getMovies(DISCOVER)
    }
    let SEARCH_URL
    if (e.target.value === 'Now Playing') {
      SEARCH_URL = NOWPLAYING
    } else if (e.target.value === 'Top Rated') {
      SEARCH_URL = TOPRATED
    } else if (e.target.value === 'Popular') {
      SEARCH_URL = POPULAR
    } else if (e.target.value === 'Upcoming') {
      SEARCH_URL = UPCOMING
    }
    await getMovies(SEARCH_URL)
  }

  const handleHomeClick = async () => {
    await getMovies(DISCOVER)
  }

  const handleSearchChange = async (e) => {
    setCurrentPage(1)
    setSearchValue(e.target.value)
    if (e.target.value === '') {
      await getMovies(DISCOVER)
    } else {
      setSelectedCategory('')
      await getMovies(SEARCHAPI + e.target.value)
    }
  }

  return (
    <div className="header">
      <div
        className="title"
        onClick={(e) => {
          handleHomeClick(e)
        }}
      >
        MovieInfo.com
      </div>
      <button className="home" onClick={handleHomeClick}>
        Home
      </button>
      <div className="select-container">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" hidden>
            Select a Category
          </option>
          <option value="Now Playing">Now Playing</option>
          <option value="Top Rated">Top Rated</option>
          <option value="Popular">Popular</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search a movie"
        className="search"
        value={searchValue}
        onChange={(e) => {
          handleSearchChange(e)
        }}
      />
    </div>
  )
}

export default Header
