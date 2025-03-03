import React from 'react';
import './widgetCard.css'
import { IconContext } from 'react-icons';
import { FiChevronRight } from 'react-icons/fi';
import WidgetEntry from './WidgetEntry';
import { useNavigate } from 'react-router-dom';

const WidgetCard = ({ title, similar, featured, newRelease, href, hasNavigate = false }) => {
  
    const handleCardToNavigate = () => {
      if (hasNavigate) {
        navigate('/trending')
      }
    } 

    const navigate = useNavigate()
    return (
        <a target='_blank' onClick={handleCardToNavigate} href={href} className="widgetcard-body">
          <p className="widget-title">{title}</p>
          {similar
            ? similar.map((artist) => (
                <WidgetEntry
                  key={artist?.id}
                  title={artist?.name}
                  subtitle={artist?.followers?.total + " Followers"}
                  image={artist?.images[2]?.url}
                />
              ))
            : featured
            ? featured.map((playlist) => (
                <WidgetEntry
                  key={playlist?.id}
                  title={playlist?.name}
                  subtitle={playlist?.tracks?.total + " Songs"}
                  image={playlist?.images[0]?.url}
                />
              ))
            : newRelease
            ? newRelease.map((album) => (
                <WidgetEntry
                  key={album?.id}
                  title={album?.name}
                  subtitle={album?.artists[0]?.name}
                  image={album?.images[2]?.url}
                />
              ))
            : null}
          <div className="widget-fade">
            <div className="fade-button">
              <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
                <FiChevronRight />
              </IconContext.Provider>
            </div>
          </div>
        </a>
      );
    
};

export default WidgetCard;