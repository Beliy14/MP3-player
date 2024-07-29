import React from 'react';
import { IconContext } from "react-icons"
import { AiFillPlayCircle } from "react-icons/ai"
import "./library.css"

const LibraryAlbum = ({playlists, playPlaylist, theChoose}) => {



    return (

      <div className={ !theChoose ? "library-body" : "library-body theChoose" }>

        {
            theChoose
            ? playlists?.splice(0, 3)?.map((playlist) => (
                <div
                    className={ !theChoose ? "playlist-card" : "playlist-card theChoose" }
                    key={playlist.id}
                    onClick={() => playPlaylist(playlist.id)}
                >
                    <img
                    src={playlist.images[0].url}
                    className="playlist-image"
                    alt="art"
                    />
                    <p className="playlist-title">{playlist.name}</p>
                    <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
                    <button className="playlist-fade">
                        <IconContext.Provider value={{ size: "50px", color: "#e99d72" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                </div>
              ))

            : playlists?.map((playlist) => (
                <div
                    className={ !theChoose ? "playlist-card" : "playlist-card theChoose" }
                    key={playlist.id}
                    onClick={() => playPlaylist(playlist.id)}
                >
                    <img
                    src={playlist.images[0].url}
                    className="playlist-image"
                    alt="art"
                    />
                    <p className="playlist-title">{playlist.name}</p>
                    <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
                    <button className="playlist-fade">
                        <IconContext.Provider value={{ size: "50px", color: "#e99d72" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                </div>
              ))

        }
        

    </div>
        
    );
};

export default LibraryAlbum;