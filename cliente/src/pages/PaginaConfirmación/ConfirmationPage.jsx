import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationPage.css'; // Optional: Add custom styles

const ConfirmationPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <h1>¡Registro Exitoso!</h1>
                <p>Gracias por registrarte. Tu cuenta ha sido creada exitosamente.</p>
                <button className="go-home-button" onClick={handleGoHome}>
                    Ir a la página principal
                </button>
            </div>
        </div>
    );
};

export default ConfirmationPage;