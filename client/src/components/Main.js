import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import DataList from './DataList'

const Main = (props) => {
  const {
    loadingData,
    mode,
    data,
    scrollToTop,
    searchValue,
    selectedCategory
  } = props
  let discoverText = '';
  if (mode === 'movie') {
    discoverText = 'Movies';
  } else if (mode === 'tv') {
    discoverText = 'TV shows';
  }
  useEffect(() => {
    scrollToTop()
  }, [data, scrollToTop])

  const renderMainContent = () => {
    if (searchValue !== '') {
      return (
        <div className="main-content">Search results for '{searchValue}'</div>
      )
    } else if (selectedCategory !== '') {
      return (
        <div className="main-content">
          Exploring {selectedCategory} {discoverText}...
        </div>
      )
    } else {
      return <div className="main-content">Discover {discoverText}...</div>
    }
  }

  return (
    <div className="main-container">
      {loadingData ?
        <div className="main-loading">
          <ReactLoading type="bars" color="white" />
        </div>
        :
        <>
          {renderMainContent()}
          <DataList mode={mode} data={data} />
        </>}
    </div>
  )
}

export default Main
