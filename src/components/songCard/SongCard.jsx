import React from 'react';
import './songCard.css'
import AlbumInfo from './AlbumInfo';
import AlbumImage from './AlbumImage';

const SongCard = ({album}) => {
    return (
        <div className='songCard-body flex'>
            <AlbumImage url={album?.images[0]?.url} />
            <AlbumInfo album={album} />
        </div>
    );
};

export default SongCard;
