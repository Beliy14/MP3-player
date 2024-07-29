import React from "react"
import "./favorites.css"
import { IconContext } from "react-icons"
import axios from "axios"
import { FaHeart } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { useNavigate } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"
import EmptyPage from "../../components/emptyPage/EmptyPage"
import apiClient from "../../spotify"

const Favorites = () => {
  const [songHeart, setSongHeart] = React.useState([])
  const [heartedTracks, setHeartedTracks] = React.useState({})
  const [playlists, setPlaylists] = React.useState(null)

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/favorites")
      .then((res) => {
        setSongHeart(res.data)
        const favorites = res.data.reduce((acc, track) => {
          acc[track.id] = true
          return acc
        }, {})
        setHeartedTracks(favorites)
      })
      .catch((e) => console.error(e))

    apiClient.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items)
    })
  }, [])

  const navigate = useNavigate()

  const toggleHeart = (track) => {
    const isHearted = heartedTracks[track.id]
    if (isHearted) {
      axios.delete(`http://localhost:5000/favorites/${track.id}`).then(() => {
        setHeartedTracks((prev) => ({
          ...prev,
          [track.id]: false,
        }))
      })
    } else {
      axios
        .post("http://localhost:5000/favorites", {
          id: track.id,
          name: track.name,
          artists: track.artists ? track.artists[0].name : "",
          images: track.images,
        })
        .then(() => {
          setHeartedTracks((prev) => ({
            ...prev,
            [track.id]: true,
          }))
        })
    }
  }

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } })
  }

  return (
    <>
      {songHeart.length > 0 ? (
        <div className="screen-container flex">
          <div className="favorites-body">
            {songHeart?.map((song) => (
              <div key={song.id} className="song-card">
                <img src={song.images} className="song-image" alt="art" />
                <p className="song-name">{song.name}</p>
                <p className="song-band">{song.artists}</p>
                <IconContext.Provider
                  value={{ size: "35px", color: "#cecbc9" }}
                >
                  {heartedTracks[song.id] ? (
                    <FaHeart
                      className="song-heart active"
                      onClick={() => toggleHeart(song)}
                    />
                  ) : (
                    <CiHeart
                      className="song-heart"
                      onClick={() => toggleHeart(song)}
                    />
                  )}
                </IconContext.Provider>
                <div className="song-fade">
                  <IconContext.Provider
                    value={{ size: "40px", color: "#cecbc9" }}
                  >
                    <FiChevronRight
                      className="song-button"
                      onClick={() => navigate("/player")}
                    />
                  </IconContext.Provider>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyPage playlists={playlists} playPlaylist={playPlaylist} >Choose your favorite songs from the albums!</EmptyPage>
      )}
    </>
  )
}

export default Favorites
