import React from 'react';
import { loginEnpoint } from '../../spotify';
import './login.css'

const Login = () => {
    return (
        <div className='login-page'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png" alt="logo-spotify" className='logo' />
            <a href={loginEnpoint}>
                <div className="login-btn">LOG IN</div>
            </a>
        </div>
    );
};

export default Login;