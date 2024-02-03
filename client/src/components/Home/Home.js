import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import './home.css'
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [movies, setMovies] = useState([])
  const [lastUrl, setLastUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const apiKey = process.env.REACT_APP_API_KEY
  const apiUrl = process.env.REACT_APP_API_URL
  const DISCOVER = `${apiUrl}discover/movie?api_key=${apiKey}&page=1`
  const getMovies = async (url) => {
    setLastUrl(url)
    // console.log(url)
    try {
      const response = await axios.get(url)
      const movies = response.data
      console.log(movies)
      setMovies(movies)
    } catch (err) {
      console.error('Error fetching movies:', err.message)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      await getMovies(DISCOVER)
    }
    fetchDiscoverMovies()
  }, [])
  return (
    <div>
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        getMovies={getMovies}
        setCurrentPage={setCurrentPage}
      />
      <Main
        movies={movies}
        scrollToTop={scrollToTop}
        searchValue={searchValue}
        selectedCategory={selectedCategory}
      />
      <Footer
        movies={movies}
        setMovies={setMovies}
        getMovies={getMovies}
        lastUrl={lastUrl}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Home
