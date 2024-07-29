import React, { useEffect, useState } from 'react';
import apiClient from '../../spotify';
import { IconContext } from 'react-icons';
import { FiChevronRight } from 'react-icons/fi';
import MoreButton from '../../components/emptyPage/moreButton/MoreButton';
import TheError from '../../components/theError/TheError';

const Trending = () => {
    const [trendTracks, setTrendTracks] = useState([]);
    const [limitCard, setLimitCard] = useState(12);
    const [isError, setIsError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')

    useEffect(() => {
        apiClient.get('/browse/featured-playlists')
            .then(res => setTrendTracks(res.data.playlists.items))
            .catch((e) => {
                console.error(e)
                setErrorMessage(e.message)
                setIsError(true)
            })
    }, []); 

    const handleTrackClick = (href) => {
        apiClient.get(href)
            .then(response => window.open(response.data.external_urls.spotify, '_blank'))
            .catch(e => console.error("Error fetching track details:", e));
    }

    const downloadMoreCard = () => {
        setLimitCard(limitCard + 6);
    }

    return (
        <div className="screen-container flex">
            <div className="feed-body">
                {trendTracks?.slice(0, limitCard).map((track) => (
                    <div key={track.id} className="feed-card">
                        <img src={track.images?.[0]?.url} alt="" className="feed-image" />
                        <p className="feed-name">{track.name}</p>
                        <p className="feed-band">{ /[<>]/.test(track.description) ? 'Description' : track.description.match(/^[^.,!?]*/)[0] }</p>
                        <button onClick={() => handleTrackClick(track.href)} className="feed-fade">
                            <IconContext.Provider value={{ size: "30px", color: "#cecbc9" }}>
                                <FiChevronRight />
                            </IconContext.Provider>
                        </button>
                    </div>
                ))}
                {isError && <TheError message={errorMessage} />}
                {!isError && trendTracks.length > limitCard && <MoreButton downloadMoreCard={downloadMoreCard} downloadCard={true} className="download-more">Download more</MoreButton>}
            </div>
        </div>
    );
}

export default Trending;