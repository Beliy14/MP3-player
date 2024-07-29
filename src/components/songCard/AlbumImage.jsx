import React from "react"
import "./albumImage.css"

const AlbumImage = ({ url }) => {
  return (
      <div className="albumImage flex">
        <img src={url} alt="art" />

        <div className="albumImage-shadow">
          <img src={url} alt="shadow"/>
        </div>
      </div>
  )
}

export default AlbumImage
