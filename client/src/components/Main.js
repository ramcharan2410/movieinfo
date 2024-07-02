import React, { useEffect } from 'react'
import DataList from './DataList'

const Main = (props) => {
  const { mode, data, scrollToTop, searchValue, selectedCategory } = props
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
      {renderMainContent()}
      <DataList
        mode={mode}
        data={data}
      />
    </div>
  )
}

export default Main
