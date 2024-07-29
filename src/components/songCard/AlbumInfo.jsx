import React from 'react';
import './albumInfo.css'

const AlbumInfo = ({album}) => {

    const artists = []

    album?.artists?.forEach(element => {
        artists.push(element.name)
    })

    return (
        <div className='albumInfo-card'>
            <div className="marque" />
            <div className="albumName-container">
                <p>{album?.name} - {artists?.join(', ')} </p>
            </div>
            <div className="album-info">
                <p>{`${album?.name} has ${album?.total_tracks} track(s)`}</p>
            </div>
            <div className="album-release">
                <p>Realease Date: {album?.release_date} </p>
            </div>
        </div>
    );
};

export default AlbumInfo;