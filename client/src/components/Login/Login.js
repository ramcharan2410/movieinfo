import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded'
import './login.css'

const Login = (props) => {
  const { userName, setUserName, setEmail, setIsAuthenticated } = props
  const [password, setPassword] = useState('')
  const [userNotFound, setUserNotFound] = useState(false)
  const [wrongUserName, setWrongUserName] = useState('')
  const [invalidPassword, setInvalidPassword] = useState(false)
  const navigate = useNavigate()
  const localhost_server_addr = process.env.REACT_APP_LOCALHOST_SERVER_ADDR
  const vercel_server_addr = process.env.REACT_APP_VERCEL_SERVER_ADDR
  const getYear = () => {
    const today = new Date()
    return today.getFullYear()
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    console.log(localhost_server_addr, vercel_server_addr)
    try {
      const response = await fetch(`${localhost_server_addr}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      })

      const data = await response.json()
      console.log(data)
      if (data.message === 'Login successful') {
        setEmail(data.email)
        setIsAuthenticated(true)
        navigate(`/users/${userName}`)
      } else if (data.message === 'Login failed: Invalid credentials') {
        setIsAuthenticated(false)
        setUserNotFound(false)
        setInvalidPassword(true)
      } else if (data.message === 'Login failed: User not found') {
        setIsAuthenticated(false)
        setUserNotFound(true)
        setInvalidPassword(false)
        setWrongUserName(userName)
      }
    } catch (error) {
      console.error('Error during form submission:', error)
    }
  }
  return (
    <>
      <div className="login-navbar">
        <LiveTvRoundedIcon fontSize="large" />
        <div className="title">Movie Info</div>
        <p className="signup-instead">
          Don't have an account? <a href="/signup">Signup instead</a>
        </p>
      </div>
      <div className="login-form">
        <form onSubmit={(e) => handleLoginSubmit(e)}>
          <label htmlFor="login-userName">Username:</label>
          <input
            type="text"
            value={userName}
            id="login-userName"
            name="login-userName"
            placeholder="Enter your username"
            required
            onChange={(e) => {
              setUserName(e.target.value)
              setUserNotFound(false)
            }}
          />
          <br />
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            value={password}
            id="login-password"
            name="login-password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value)
              setInvalidPassword(false)
            }}
          />
          <br />
          <p
            className="invalid-password"
            style={{ display: invalidPassword ? 'block' : 'none' }}
          >
            Wrong password
          </p>
          <p
            className="user-not-found"
            style={{ display: userNotFound ? 'block' : 'none' }}
          >
            User with userName {wrongUserName} not found.
          </p>
          <button type="submit" className="login-button">
            Confirm Login
          </button>
        </form>
      </div>
      <div className="login-footer">Copyright &copy; {getYear()}</div>
    </>
  )
}

export default Login
