import React from "react"
import APIKit from "../../spotify"
import { useNavigate } from "react-router-dom"
import LibraryAlbum from "./LibraryAlbum"

const Library = () => {
  const [playlists, setPlaylists] = React.useState(null)

  React.useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items)
    })
  }, [])

  const navigate = useNavigate()

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } })
  }

  return (
    <div className="screen-container">
        <LibraryAlbum playlists={playlists} playPlaylist={playPlaylist} />
    </div>
  )
}

export default Library