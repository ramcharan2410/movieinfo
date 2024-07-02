import React, { useState } from 'react'
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded'
import { RiMovie2Line } from "react-icons/ri";

const Header = (props) => {
  const {
    mode,
    setMode,
    selectedCategory,
    setSelectedCategory,
    searchValue,
    setSearchValue,
    getData,
    setCurrentPage,
  } = props
  const [searchURL, setSearchURL] = useState('')
  const [placeHolderText, setPlaceHolderText] = useState('Search for a movie...')
  const apiKey = process.env.REACT_APP_API_KEY
  const apiUrl = process.env.REACT_APP_API_URL
  const movieURLs = {
    DISCOVER_MOVIE: `${apiUrl}discover/movie?api_key=${apiKey}&page=1`,
    SEARCHAPI_MOVIE: `${apiUrl}search/movie?api_key=${apiKey}&query=`,
    NOWPLAYING_MOVIE: `${apiUrl}movie/now_playing?language=en-US&api_key=${apiKey}&page=1`,
    UPCOMING_MOVIE: `${apiUrl}movie/upcoming?language=en-US&api_key=${apiKey}&page=1`,
    POPULAR_MOVIE: `${apiUrl}movie/popular?language=en-US&api_key=${apiKey}&page=1`,
    TOPRATED_MOVIE: `${apiUrl}movie/top_rated?language=en-US&api_key=${apiKey}&page=1`,
  }
  const tvURLs = {
    DISCOVER_TV: `${apiUrl}discover/tv?api_key=${apiKey}&page=1`,
    SEARCHAPI_TV: `${apiUrl}search/tv?api_key=${apiKey}&query=`,
    AIRINGTODAY_TV: `${apiUrl}tv/airing_today?language=en-US&api_key=${apiKey}&page=1`,
    ONTHEAIR_TV: `${apiUrl}tv/on_the_air?language=en-US&api_key=${apiKey}&page=1`,
    POPULAR_TV: `${apiUrl}tv/popular?language=en-US&api_key=${apiKey}&page=1`,
    TOPRATED_TV: `${apiUrl}tv/top_rated?language=en-US&api_key=${apiKey}&page=1`,
  }
  const { DISCOVER_MOVIE, SEARCHAPI_MOVIE, NOWPLAYING_MOVIE, UPCOMING_MOVIE, POPULAR_MOVIE, TOPRATED_MOVIE } = movieURLs
  const { DISCOVER_TV, SEARCHAPI_TV, AIRINGTODAY_TV, ONTHEAIR_TV, POPULAR_TV, TOPRATED_TV } = tvURLs
  const handleCategoryChange = async (e) => {
    setCurrentPage(1)
    setSelectedCategory(e.target.value)
    if (selectedCategory === '') {
      if (mode === 'movie')
        await getData(DISCOVER_MOVIE)
      else
        await getData(DISCOVER_TV)
    }
    if (e.target.value === 'Popular') {
      if (mode === 'movie')
        setSearchURL(POPULAR_MOVIE)
      else
        setSearchURL(POPULAR_TV)
    }
    else if (e.target.value === 'Top Rated') {
      if (mode === 'movie')
        setSearchURL(TOPRATED_MOVIE)
      else
        setSearchURL(TOPRATED_TV)
    } else if (e.target.value === 'Now Playing') {
      setSearchURL(NOWPLAYING_MOVIE)
    } else if (e.target.value === 'Upcoming') {
      setSearchURL(UPCOMING_MOVIE)
    } else if (e.target.value === 'Airing Today') {
      setSearchURL(AIRINGTODAY_TV)
    } else if (e.target.value === 'On the air') {
      setSearchURL(ONTHEAIR_TV)
    }
    await getData(searchURL)
  }

  const handleHomeClick = async () => {
    setSelectedCategory('')
    setSearchValue('')
    if (mode === 'movie')
      await getData(DISCOVER_MOVIE)
    else
      await getData(DISCOVER_TV)
  }

  const handleSearchChange = async (e) => {
    setCurrentPage(1)
    setSearchValue(e.target.value)
    if (e.target.value === '') {
      if (mode === 'movie')
        await getData(DISCOVER_MOVIE)
      else
        await getData(DISCOVER_TV)
    } else {
      setSelectedCategory('')
      if (mode === 'movie')
        await getData(SEARCHAPI_MOVIE + e.target.value)
      else
        await getData(SEARCHAPI_TV + e.target.value)
    }
  }
  return (
    <div className="header">
      <div className="title-container">
        <RiMovie2Line size={26} />
        <div className="title-name">MovieInfo</div>
      </div>
      <button
        className="btn-home"
        onClick={handleHomeClick}
        style={{ backgroundColor: searchURL === (DISCOVER_MOVIE || DISCOVER_TV) ? '#00ADB5' : 'white' }}
      >
        Home
      </button>
      <div className="mode-select">
        <button
          className="movie-mode"
          onClick={() => { setMode('movie'); setPlaceHolderText('Search for a Movie...'); getData(DISCOVER_MOVIE); setSearchValue('') }}
          style={{ backgroundColor: mode === 'movie' ? '#00ADB5' : 'white' }}
        >Movies</button>
        <button
          className="tv-mode"
          onClick={() => { setMode('tv'); setPlaceHolderText('Search for a TV show...'); getData(DISCOVER_TV); setSearchValue('') }}
          style={{ backgroundColor: mode === 'tv' ? '#00ADB5' : 'white' }}
        >TV Shows</button>
      </div>
      {mode === 'movie' && (
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" hidden>
            Select a Category
          </option>
          <option value="Now Playing">Now Playing</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Popular">Popular</option>
          <option value="Top Rated">Top Rated</option>
        </select>
      )}
      {mode === 'tv' && (
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" hidden>
            Select a Category
          </option>
          <option value="Airing Today">Airing Today</option>
          <option value="On the Air">On the Air</option>
          <option value="Popular">Popular</option>
          <option value="Top Rated">Top Rated</option>
        </select>
      )}
      <input
        type="text"
        placeholder={placeHolderText}
        className="data-search"
        value={searchValue}
        onChange={(e) => {
          handleSearchChange(e)
        }}
      />
    </div>
  )
}

export default Header
