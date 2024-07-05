import React, { useState, useEffect } from 'react';
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
  } = props;

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  const movieURLs = {
    DISCOVER_MOVIE: `${apiUrl}discover/movie?api_key=${apiKey}&page=1`,
    SEARCHAPI_MOVIE: `${apiUrl}search/movie?api_key=${apiKey}&query=`,
    TRENDING_MOVIE: `${apiUrl}trending/movie?api_key=${apiKey}&page=1`,
    NOWPLAYING_MOVIE: `${apiUrl}movie/now_playing?language=en-US&api_key=${apiKey}&page=1`,
    UPCOMING_MOVIE: `${apiUrl}movie/upcoming?language=en-US&api_key=${apiKey}&page=1`,
    POPULAR_MOVIE: `${apiUrl}movie/popular?language=en-US&api_key=${apiKey}&page=1`,
    TOPRATED_MOVIE: `${apiUrl}movie/top_rated?language=en-US&api_key=${apiKey}&page=1`,
  };

  const tvURLs = {
    DISCOVER_TV: `${apiUrl}discover/tv?api_key=${apiKey}&page=1`,
    SEARCHAPI_TV: `${apiUrl}search/tv?api_key=${apiKey}&query=`,
    TRENDING_TV: `${apiUrl}trending/tv?api_key=${apiKey}&page=1`,
    AIRINGTODAY_TV: `${apiUrl}tv/airing_today?language=en-US&api_key=${apiKey}&page=1`,
    ONTHEAIR_TV: `${apiUrl}tv/on_the_air?language=en-US&api_key=${apiKey}&page=1`,
    POPULAR_TV: `${apiUrl}tv/popular?language=en-US&api_key=${apiKey}&page=1`,
    TOPRATED_TV: `${apiUrl}tv/top_rated?language=en-US&api_key=${apiKey}&page=1`,
  };

  const { DISCOVER_MOVIE, SEARCHAPI_MOVIE, TRENDING_MOVIE, NOWPLAYING_MOVIE, UPCOMING_MOVIE, POPULAR_MOVIE, TOPRATED_MOVIE } = movieURLs;
  const { DISCOVER_TV, SEARCHAPI_TV, TRENDING_TV, AIRINGTODAY_TV, ONTHEAIR_TV, POPULAR_TV, TOPRATED_TV } = tvURLs;

  const [searchURL, setSearchURL] = useState(mode === 'movie' ? DISCOVER_MOVIE : DISCOVER_TV);
  const [placeHolderText, setPlaceHolderText] = useState('Search for a movie...');

  // Effect to fetch data whenever searchURL changes
  useEffect(() => {
    const fetchData = async () => {
      if (searchURL) {
        await getData(searchURL);
      }
    }
    fetchData();
  }, [searchURL]);

  // Handle category change
  const handleCategoryChange = (e) => {
    setCurrentPage(1);
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);

    let newSearchURL;
    if (newCategory === 'Trending') {
      newSearchURL = mode === 'movie' ? TRENDING_MOVIE : TRENDING_TV;
    } else if (newCategory === 'Popular') {
      newSearchURL = mode === 'movie' ? POPULAR_MOVIE : POPULAR_TV;
    } else if (newCategory === 'Top Rated') {
      newSearchURL = mode === 'movie' ? TOPRATED_MOVIE : TOPRATED_TV;
    } else if (newCategory === 'Now Playing') {
      newSearchURL = NOWPLAYING_MOVIE;
    } else if (newCategory === 'Upcoming') {
      newSearchURL = UPCOMING_MOVIE;
    } else if (newCategory === 'Airing Today') {
      newSearchURL = AIRINGTODAY_TV;
    } else if (newCategory === 'On the Air') {
      newSearchURL = ONTHEAIR_TV;
    }
    setSearchURL(newSearchURL);
  };

  const handleHomeClick = async () => {
    setSelectedCategory('');
    setSearchValue('');
    if (mode === 'movie') {
      setSearchURL(DISCOVER_MOVIE);
      await getData(DISCOVER_MOVIE);
    } else {
      setSearchURL(DISCOVER_TV);
      await getData(DISCOVER_TV);
    }
  };

  const handleMovieModeClick = async () => {
    setMode('movie');
    setPlaceHolderText('Search for a Movie...');
    setSearchURL(DISCOVER_MOVIE);
    await getData(DISCOVER_MOVIE);
    setSearchValue('');
    setSelectedCategory('');
  };

  const handleTvModeClick = async () => {
    setMode('tv');
    setPlaceHolderText('Search for a TV show...');
    setSearchURL(DISCOVER_TV);
    await getData(DISCOVER_TV);
    setSearchValue('');
    setSelectedCategory('');
  };

  const handleSearchChange = async (e) => {
    setCurrentPage(1);
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      if (mode === 'movie') {
        setSearchURL(DISCOVER_MOVIE);
        await getData(DISCOVER_MOVIE);
      } else {
        setSearchURL(DISCOVER_TV);
        await getData(DISCOVER_TV);
      }
    } else {
      setSelectedCategory('');
      if (mode === 'movie') {
        await getData(SEARCHAPI_MOVIE + e.target.value);
      } else {
        await getData(SEARCHAPI_TV + e.target.value);
      }
    }
  };

  return (
    <div className="header">
      <div className="title-container">
        <RiMovie2Line size={26} />
        <div className="title-name">MovieInfo</div>
      </div>
      <button
        className="btn-home"
        onClick={handleHomeClick}
        style={{ backgroundColor: (searchURL === DISCOVER_MOVIE || searchURL === DISCOVER_TV) ? '#00ADB5' : 'white' }}
      >
        Home
      </button>
      <div className="mode-select">
        <button
          className="movie-mode"
          onClick={handleMovieModeClick}
          style={{ backgroundColor: mode === 'movie' ? '#00ADB5' : 'white' }}
        >Movies</button>
        <button
          className="tv-mode"
          onClick={handleTvModeClick}
          style={{ backgroundColor: mode === 'tv' ? '#00ADB5' : 'white' }}
        >TV Shows</button>
      </div>
      {mode === 'movie' && (
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" hidden>
            Select a Category
          </option>
          {/* <option value="Trending">Trending</option> */}
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
          {/* <option value="Trending">Trending</option> */}
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
