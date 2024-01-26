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
  return (
    <div>
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        getMovies={getMovies}
      />
      <Main selectedCategory={selectedCategory} movies={movies} />
      <Footer
        movies={movies}
        setMovies={setMovies}
        getMovies={getMovies}
        lastUrl={lastUrl}
      />
    </div>
  )
}

export default Home
