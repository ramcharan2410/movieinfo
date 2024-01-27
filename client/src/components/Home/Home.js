import React, { useState } from 'react'
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
        selectedCategory={selectedCategory}
        movies={movies}
        scrollToTop={scrollToTop}
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
