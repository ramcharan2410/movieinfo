import { Analytics } from '@vercel/analytics/react'
import Home from './components/Home/Home.js'
const App = () => {
  return (
    <>
      <Analytics/>
     <Home/>
    </>
  )
}

export default App
