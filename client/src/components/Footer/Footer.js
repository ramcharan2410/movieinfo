import React from 'react'
import './footer.css'

const Footer = (props) => {
  const { movies, getMovies, lastUrl, currentPage, setCurrentPage } = props

  const getYear = () => {
    const today = new Date()
    return today.getFullYear()
  }

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage)

    let urlsplit = lastUrl.split('?')
    let queryParams = urlsplit[1].split('&')
    let key = queryParams[queryParams.length - 1].split('=')

    if (key[0] !== 'page') {
      let url = lastUrl + '&page=' + newPage
      await getMovies(url)
    } else {
      key[1] = newPage.toString()
      let a = key.join('=')
      queryParams[queryParams.length - 1] = a
      let b = queryParams.join('&')
      let url = urlsplit[0] + '?' + b
      await getMovies(url)
    }
  }

  return (
    <div className="footer">
      <div className="custom-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>
        <span className="current-page">
          {currentPage} of {movies.total_pages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === movies.total_pages}
        >
          Next &gt;
        </button>
      </div>
      <div className="footer-copyright">Copyright &copy; {getYear()}</div>
    </div>
  )
}

export default Footer
