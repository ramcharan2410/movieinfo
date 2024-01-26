import React from 'react'
import Pagination from '@mui/material/Pagination'
import './footer.css'
const Footer = (props) => {
  const { movies, setMovies, getMovies, lastUrl } = props
  const getYear = () => {
    const today = new Date()
    return today.getFullYear()
  }
  const handlePageChange = async (e) => {
    const ariaLabel = e.target.ariaLabel
    const words = ariaLabel.split(' ')
    const page = words[words.length - 1]
    // console.log(page)
    let urlsplit = lastUrl.split('?')
    let queryParams = urlsplit[1].split('&')
    let key = queryParams[queryParams.length - 1].split('=')
    if (key[0] !== 'page') {
      let url = lastUrl + '&page=' + page
      await getMovies(url)
    } else {
      key[1] = page.toString()
      let a = key.join('=')
      queryParams[queryParams.length - 1] = a
      let b = queryParams.join('&')
      let url = urlsplit[0] + '?' + b
      await getMovies(url)
    }
  }
  return (
    <div className="footer">
      <Pagination
        count={movies.total_pages}
        color="secondary"
        onChange={(e) => {
          handlePageChange(e)
        }}
      />
      <div className="footer-copyright">Copyright &copy; {getYear()}</div>
    </div>
  )
}

export default Footer
