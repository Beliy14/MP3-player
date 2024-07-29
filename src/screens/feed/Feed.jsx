import React from "react"
import apiClient from "../../spotify"
import './feed.css'
import { IconContext } from "react-icons"
import { FiChevronRight } from "react-icons/fi"
import MoreButton from "../../components/emptyPage/moreButton/MoreButton"
import TheError from "../../components/theError/TheError"

const Feed = () => {
  const [tracksFeed, setTracksFeed] = React.useState([])
  const [offset, setOffset] = React.useState(0)
  const [isError, setIsError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const limitCard = 12

  const token = window.localStorage.getItem('token');

  React.useEffect(() => {
    apiClient.get(`/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&limit=${limitCard}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => {
      setTracksFeed(res.data.tracks);
    })
    .catch((e) => {
      console.error(e)
      setErrorMessage(e.message)
      setIsError(true)
    })
  }, [])

  React.useEffect(() => {
    if (offset > 0) {
      apiClient.get(`/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&limit=${limitCard}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then((res) => {
        setTracksFeed((prevTracks) => [...prevTracks, ...res.data.tracks]);
      })
      .catch((e) => {
        console.error(e)
        setErrorMessage(e.message)
        setIsError(true)
      })
    }
  }, [offset])

  const handleTrackClick = (href) => {
    apiClient.get(href, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => window.open(response.data.external_urls.spotify, '_blank'))
    .catch(e => console.error("Error fetching track details:", e));
  }

  const downloadMoreCard = () => {
    setOffset(offset + limitCard);
  }
  
  return (
    <div className="screen-container flex">
        <div className="feed-body">
            {tracksFeed?.map((track) => (
            <div key={track.id} className="feed-card">
                <img src={track.album?.images[0]?.url} alt="art" className="feed-image" />
                <p className="feed-name">{track.name}</p>
                <p className="feed-band">{track?.artists?.map(artist => artist.name).join(', ')}</p>
                <button onClick={() => handleTrackClick(track?.href)} className="feed-fade">
                    <IconContext.Provider value={{ size: "30px", color: "#cecbc9" }}>
                        <FiChevronRight />
                    </IconContext.Provider>
                </button>
            </div>
            ))}
        {isError && <TheError message={errorMessage} />}
        {!isError && tracksFeed.length < 48 && (
              <MoreButton downloadMoreCard={downloadMoreCard} downloadCard={true} className="download-more">Download more</MoreButton>
            )}
        </div>
    </div>
  )
}

export default Feed