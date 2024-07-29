import React from 'react';
import './theError.css';
import { useNavigate } from 'react-router-dom';

const TheError = ({ message }) => {
    const navigate = useNavigate()
    return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <div className="error-message">{message}</div>
            <button onClick={() => navigate('/')} className="error-button">Exit</button>
        </div>
    );
};

export default TheError;