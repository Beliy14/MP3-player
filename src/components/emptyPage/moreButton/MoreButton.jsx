import React from 'react'
import { IconContext } from "react-icons"
import { FiChevronRight } from "react-icons/fi"
import { Link } from "react-router-dom"
import './moreButton.css'

const MoreButton = ({downloadMoreCard, downloadCard = false, children}) => {
    return (
        <>
            {downloadCard 
            ? <div onClick={downloadMoreCard} className="more-albums">
                <p>{children}</p>
                <span>
                <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
                    <FiChevronRight />
                </IconContext.Provider>
                </span>
              </div>

            : <Link to="/" className="more-albums">
                    <p>{children}</p>
                    <span>
                    <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
                        <FiChevronRight />
                    </IconContext.Provider>
                    </span>
              </Link>


            }
        </>
    )
}

export default MoreButton;