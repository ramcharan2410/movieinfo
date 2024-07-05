import { Analytics } from '@vercel/analytics/react'
import './App.css'
import React, { useState } from 'react'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Main from '../src/components/Main'
import { getDataWithCache } from './services/api'

const App = () => {
  const [loadingData, setLoadingData] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [mode, setMode] = useState('movie')
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [lastUrl, setLastUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const getData = async (url) => {
    console.log(url);
    setLastUrl(url);
    setLoadingData(true);

    try {
      // Introduce a delay to simulate loading
      await new Promise((resolve) => setTimeout(resolve, 900)); // 1 second delay

      const data = await getDataWithCache(url); // Use the caching function
      // console.log(data);
      setData(data);
    } catch (err) {
      console.error('Error fetching data:', err.message);
    } finally {
      setLoadingData(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
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
        loadingData={loadingData}
        mode={mode}
        data={data}
        scrollToTop={scrollToTop}
        searchValue={searchValue}
        selectedCategory={selectedCategory}
      />
      <Footer
        loadingData={loadingData}
        setLoadingData={setLoadingData}
        data={data}
        getData={getData}
        lastUrl={lastUrl}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default App
