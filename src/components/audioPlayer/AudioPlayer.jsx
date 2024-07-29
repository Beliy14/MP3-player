import React from "react";
import "./audioPlayer.css";
import WaveAnimation from "./WaveAnimation";
import Controls from "./Controls";
import ProgressCircle from "./progressCircle";
import { CiHeart } from "react-icons/ci";
import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";

export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
  isHearted,
  toggleHeart
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [trackProgress, setTrackProgress] = React.useState(0);
  const [isSpotifyText, setIsSpotifyText] = React.useState(false); 

  var audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = React.useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = React.useRef();

  const isReady = React.useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  React.useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  React.useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
      setIsSpotifyText(true) 
      setTimeout(() => {
        setIsSpotifyText(false)
      }, 4000);
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  return (
    <div className="player-body flex">
      <div className="player-left-body flex">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#C96850"
        />
          <IconContext.Provider value={{ size: '40px', color: '#e68d5a'}}>
            { 
              isHearted
               ? <FaHeart className="heart active" onClick={toggleHeart} />
               : <CiHeart className="heart" onClick={toggleHeart} />
            }
          </IconContext.Provider>
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:29</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
        {isSpotifyText && <p className="spotify-text">Go to <a target="_blank" href={currentTrack?.external_urls?.spotify}>Spotify</a> and listen to the full version!</p> }
      </div>
    </div>
  );
}