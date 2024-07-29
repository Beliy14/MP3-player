import React from 'react';
import './sidebar.css'
import SidebarButton from './SidebarButton';
import {MdFavorite, MdSpaceDashboard} from 'react-icons/md'
import {FaGripfire, FaSignOutAlt, FaPlay} from 'react-icons/fa'
import {IoLibrary} from 'react-icons/io5'
import apiClient from '../../spotify';

const Sidebar = () => {

    const [image, setImage] = React.useState("https://kartinki.pics/uploads/posts/2023-04/1681382650_kartinkin-net-p-onto-art-vkontakte-68.jpg")

    React.useEffect(() => {
        apiClient.get("me").then(response => {
            if (response.data.images[0]) {
                setImage(response.data.images[0].url)
            }
        })
    }, []) 

    const exitMusicPlayer = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <div className='sidebar-container'>
            <img src={image} alt='profile-img' className='profile-img' />
            <div>
                <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
                <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
                <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
                <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
                <SidebarButton title="Library" to="/" icon={<IoLibrary />} />


            </div>
            <SidebarButton onExitPlayer={exitMusicPlayer} title="Sign Out" icon={<FaSignOutAlt />} />
        </div>
        
    );
};

export default Sidebar;