import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Library from "../library/Library"
import Feed from "../feed/Feed"
import Trending from "../trending/Trending"
import Player from "../player/Player"
import Favorites from "../favorites/Favorites"
import "./home.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Login from "../auth/Login"
import { setClientToken } from "../../spotify"

const Home = () => {
  const [token, setToken] = React.useState("")

  React.useEffect(() => {
    const token = window.localStorage.getItem('token')
    const expiresAt = window.localStorage.getItem('expiresAt')
    const hash = window.location.hash
    window.location.hash = ""

    if (!token && hash) {
      const _token = hash.split("&")[0].split('=')[1]
      const expiresAt = Date.now() + 3600 * 1000
      window.localStorage.setItem('token', _token)
      window.localStorage.setItem('expiresAt', expiresAt)
      setToken(_token)
      setClientToken(_token)
    } else if (token) {
      setToken(token)
      setClientToken(token)
    }

    const checkTokenExpiration = () => {
      if (expiresAt && Date.now() > expiresAt) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('expiresAt')
        window.location.reload()
      }
    }

    const interval = setInterval(checkTokenExpiration, 600000) 
    return () => clearInterval(interval)
  }, [])

  return (!token
    ? <Login />
    : <BrowserRouter>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default Home