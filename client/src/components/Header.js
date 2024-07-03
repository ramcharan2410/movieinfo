import React, { useState } from 'react'
import { RiMovie2Line } from "react-icons/ri";

const Header = (props) => {
  const {
    loadingData,
    setLoadingData,
    mode,
    setMode,
    selectedCategory,
    setSelectedCategory,
    searchValue,
    setSearchValue,
    getData,
    setCurrentPage,
  } = props
  const apiKey = process.env.REACT_APP_API_KEY
  const apiUrl = process.env.REACT_APP_API_URL
  const movieURLs = {
    DISCOVER_MOVIE: `${apiUrl}discover/movie?api_key=${apiKey}&page=1`,
    SEARCHAPI_MOVIE: `${apiUrl}search/movie?api_key=${apiKey}&query=`,
    TRENDING_MOVIE: `${apiUrl}trending/movie?api_key=${apiKey}&page=1`,
    NOWPLAYING_MOVIE: `${apiUrl}movie/now_playing?language=en-US&api_key=${apiKey}&page=1`,
    UPCOMING_MOVIE: `${apiUrl}movie/upcoming?language=en-US&api_key=${apiKey}&page=1`,
    POPULAR_MOVIE: `${apiUrl}movie/popular?language=en-US&api_key=${apiKey}&page=1`,
    TOPRATED_MOVIE: `${apiUrl}movie/top_rated?language=en-US&api_key=${apiKey}&page=1`,
  }
  const tvURLs = {
    DISCOVER_TV: `${apiUrl}discover/tv?api_key=${apiKey}&page=1`,
    SEARCHAPI_TV: `${apiUrl}search/tv?api_key=${apiKey}&query=`,
    TRENDING_TV: `${apiUrl}trending/tv?api_key=${apiKey}&page=1`,
    AIRINGTODAY_TV: `${apiUrl}tv/airing_today?language=en-US&api_key=${apiKey}&page=1`,
    ONTHEAIR_TV: `${apiUrl}tv/on_the_air?language=en-US&api_key=${apiKey}&page=1`,
    POPULAR_TV: `${apiUrl}tv/popular?language=en-US&api_key=${apiKey}&page=1`,
    TOPRATED_TV: `${apiUrl}tv/top_rated?language=en-US&api_key=${apiKey}&page=1`,
  }
  const { DISCOVER_MOVIE, SEARCHAPI_MOVIE, TRENDING_MOVIE, NOWPLAYING_MOVIE, UPCOMING_MOVIE, POPULAR_MOVIE, TOPRATED_MOVIE } = movieURLs
  const { DISCOVER_TV, SEARCHAPI_TV, TRENDING_TV, AIRINGTODAY_TV, ONTHEAIR_TV, POPULAR_TV, TOPRATED_TV } = tvURLs
  const [searchURL, setSearchURL] = useState(mode === 'movie' ? DISCOVER_MOVIE : DISCOVER_TV)
  const [placeHolderText, setPlaceHolderText] = useState('Search for a movie...')
  const handleCategoryChange = async (e) => {
    setLoadingData(true)
    setCurrentPage(1)
    setSelectedCategory(e.target.value)
    if (selectedCategory === 'Trending') {
      if (mode === 'movie')
        setSearchURL(TRENDING_MOVIE)
      else
        setSearchURL(TRENDING_TV)
    } else if (selectedCategory === 'Popular') {
      if (mode === 'movie')
        setSearchURL(POPULAR_MOVIE)
      else
        setSearchURL(POPULAR_TV)
    }
    else if (selectedCategory === 'Top Rated') {
      if (mode === 'movie')
        setSearchURL(TOPRATED_MOVIE)
      else
        setSearchURL(TOPRATED_TV)
    } else if (selectedCategory === 'Now Playing') {
      setSearchURL(NOWPLAYING_MOVIE)
    } else if (selectedCategory === 'Upcoming') {
      setSearchURL(UPCOMING_MOVIE)
    } else if (selectedCategory === 'Airing Today') {
      setSearchURL(AIRINGTODAY_TV)
    } else if (selectedCategory === 'On the air') {
      setSearchURL(ONTHEAIR_TV)
    }
    await getData(searchURL)
    setLoadingData(false)
  }

  const handleHomeClick = async () => {
    setSelectedCategory('')
    setSearchValue('')
    setLoadingData(true)
    if (mode === 'movie') {
      setSearchURL(DISCOVER_MOVIE)
      await getData(searchURL)
    }
    else {
      setSearchURL(DISCOVER_TV)
      await getData(searchURL)
    }
    setLoadingData(false)
  }

  const handleSearchChange = async (e) => {
    setCurrentPage(1)
    setSearchValue(e.target.value)
    if (e.target.value === '') {
      if (mode === 'movie') {
        setSearchURL(DISCOVER_MOVIE)
        await getData(searchURL)
      }
      else {
        setSearchURL(DISCOVER_TV)
        await getData(searchURL)
      }
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
        onClick={() => handleHomeClick()}
        style={{ backgroundColor: (searchURL === DISCOVER_MOVIE || searchURL === DISCOVER_TV) ? '#00ADB5' : 'white' }}
      >
        Home
      </button>
      <div className="mode-select">
        <button
          className="movie-mode"
          onClick={() => {
            setMode('movie');
            setPlaceHolderText('Search for a Movie...');
            setSearchURL(DISCOVER_MOVIE);
            getData(searchURL);
            setSearchValue('');
            setSelectedCategory('')
          }}
          style={{ backgroundColor: mode === 'movie' ? '#00ADB5' : 'white' }}
        >Movies</button>
        <button
          className="tv-mode"
          onClick={() => {
            setMode('tv');
            setPlaceHolderText('Search for a TV show...');
            setSearchURL(DISCOVER_TV);
            getData(searchURL);
            setSearchValue('');
            setSelectedCategory('')
          }}
          style={{ backgroundColor: mode === 'tv' ? '#00ADB5' : 'white' }}
        >TV Shows</button>
      </div>
      {mode === 'movie' && (
        <select value={selectedCategory} onChange={(e) => { handleCategoryChange(e) }}>
          <option value="" hidden>
            Select a Category
          </option>
          <option value="Trending">Trending</option>
          <option value="Now Playing">Now Playing</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Popular">Popular</option>
          <option value="Top Rated">Top Rated</option>
        </select>
      )}
      {mode === 'tv' && (
        <select value={selectedCategory} onChange={(e) => { handleCategoryChange(e) }}>
          <option value="" hidden>
            Select a Category
          </option>
          <option value="Trending">Trending</option>
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
