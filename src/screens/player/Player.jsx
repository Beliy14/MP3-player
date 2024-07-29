import React from "react"
import "./player.css"
import { useLocation, useNavigate } from "react-router-dom"
import apiClient from "../../spotify"
import axios from "axios"
import SongCard from "../../components/songCard/SongCard"
import Queue from "../../components/queue/Queue"
import AudioPlayer from "../../components/audioPlayer/AudioPlayer"
import Widgets from "../../components/widgets/Widgets"
import EmptyPage from "../../components/emptyPage/EmptyPage"

const Player = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [tracks, setTracks] = React.useState([])
  const [currentTrack, setCurrentTrack] = React.useState({})
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [playlists, setPlaylists] = React.useState(null)
  const [heartedTracks, setHeartedTracks] = React.useState({})

  React.useEffect(() => {
    axios.get("http://localhost:5000/favorites").then(response => {
      const favorites = response.data.reduce((acc, track) => {
        acc[track.id] = true;
        return acc;
      }, {});
      setHeartedTracks(favorites);
    });

    apiClient.get("me/playlists").then(function (response) {
      setPlaylists(response.data.items)
    })
  }, [])

  const playPlaylist = (id) => {
    navigate("/player", {state: { id: id } })
  }

  React.useEffect(() => {
    if (location.state) {
      apiClient
            .get(`playlists/${location.state?.id}/tracks`)
            .then(res => {
                setTracks(res.data.items)
                setCurrentTrack(res.data.items[0].track)
            })
    }
  }, [location.state])

  React.useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track)
  }, [currentIndex, tracks])

  const toggleHeart = (track) => {
    const isHearted = heartedTracks[track.id];
    if (isHearted) {
      axios.delete(`http://localhost:5000/favorites/${track.id}`).then(() => {
        setHeartedTracks(prev => ({
          ...prev,
          [track.id]: false
        }));
      });
    } else {
      axios.post("http://localhost:5000/favorites", {
        id: track.id,
        name: track.name,
        artists: track.artists[0].name,
        images: track.album.images[0].url
      }).then(() => {
        setHeartedTracks(prev => ({
          ...prev,
          [track.id]: true
        }));
      });
    }
  }

  return (
    <>
      {
        tracks.length > 0
        ? <div className="screen-container flex">
              <div className="left-player-body">
                <AudioPlayer 
                  total={tracks} 
                  currentTrack={currentTrack} 
                  currentIndex={currentIndex} 
                  setCurrentIndex={setCurrentIndex} 
                  isHearted={heartedTracks[currentTrack?.id] || false} 
                  toggleHeart={() => toggleHeart(currentTrack)} 
                />
                <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
              </div>

              <div className="right-player-body">
                <SongCard album={currentTrack?.album} />
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
              </div>
        </div>
        : <EmptyPage playlists={playlists} playPlaylist={playPlaylist}>Choose an album!</EmptyPage>
      }
    </>
  )
}

export default Player