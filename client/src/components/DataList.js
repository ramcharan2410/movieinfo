import React from 'react'
import DataItem from './DataItem'

const DataList = ({ mode, data }) => {
  const pageData = data.results || []
  const noResultsFound = pageData.length === 0
  let noDataFoundText = '';
  if (mode === 'movie') {
    noDataFoundText = 'No movies found :('
  } else if (mode === 'tv') {
    noDataFoundText = 'No TV shows found :('
  }
  return (
    <div className="datalist-container">
      {noResultsFound ? (
        <p className="no-data-found">{noDataFoundText}</p>
      ) : (
        pageData.map((data) => <DataItem key={data.id} data={data} />)
      )}
    </div>
  )
}

export default DataList
