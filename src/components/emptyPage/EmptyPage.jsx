import React from "react"
import LibraryAlbum from "../../screens/library/LibraryAlbum"
import './emptyPage.css'
import MoreButton from "./moreButton/MoreButton"

const EmptyPage = ({playlists, playPlaylist, children}) => {
  return (
    <div className="screen-container flex">
      <div className="text-center">
        <p className="choose-text">{children}</p>

        <LibraryAlbum
          playlists={playlists}
          playPlaylist={playPlaylist}
          theChoose={true}
        />

        <MoreButton>More albums</MoreButton>
      </div>
    </div>
  )
}

export default EmptyPage
