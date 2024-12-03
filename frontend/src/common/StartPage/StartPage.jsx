import React from "react";
import './StartPage.css'
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";
import companyLogo from '../../assets/logodark.png';
import { useState, useEffect } from 'react';

function StartPage() {
    const [isLogin, setIsLogin] = useState(true);

    function switchForm() {
        setIsLogin(!isLogin);
    }

    return (
        <section className="start-page">
            <video autoPlay loop muted className="background-video" src="/background_video.mp4" type="video/mp4"></video>
            <div className="wrapper">
                {isLogin ? <LoginForm /> : <RegisterForm />}
                <p>
                    {isLogin ? "No tienes una cuenta?" : "Ya tienes una cuenta?"}{" "}
                    <span onClick={switchForm} style={{ cursor: 'pointer', fontWeight: 'bold', color: 'green' }}>
                        {isLogin ? "Regístrate" : "Inicia sesión"}
                    </span>
                </p>
                <img src={companyLogo} className="logo" alt="Logo" />
            </div>
        </section>
    );
}

export default StartPage;