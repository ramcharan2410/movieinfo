import { Analytics } from '@vercel/analytics/react'
import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Main from '../src/components/Main'
const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [mode, setMode] = useState('movie')
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [lastUrl, setLastUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const apiKey = process.env.REACT_APP_API_KEY
  const apiUrl = process.env.REACT_APP_API_URL
  const DISCOVER = `${apiUrl}discover/${mode}?api_key=${apiKey}&page=1`
  const getData = async (url) => {
    setLastUrl(url)
    // console.log(url)
    try {
      const response = await axios.get(url)
      const data = response.data
      console.log(data)
      setData(data)
    } catch (err) {
      console.error('Error fetching data:', err.message)
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
    const fetchData = async () => {
      await getData(DISCOVER)
    }
    fetchData()
  }, [])
  return (
    <div className='App'>
      <Header
        mode={mode}
        setMode={setMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        getData={getData}
        setCurrentPage={setCurrentPage}
        />
      <Main
        mode={mode}
        data={data}
        scrollToTop={scrollToTop}
        searchValue={searchValue}
        selectedCategory={selectedCategory}
      />
      <Footer
        data={data}
        setData={setData}
        getData={getData}
        lastUrl={lastUrl}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default App
