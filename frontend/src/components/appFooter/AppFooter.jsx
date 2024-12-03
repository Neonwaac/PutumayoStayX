import React from "react";
import './AppFooter.css';
import { FaYoutube, FaInstagram } from "react-icons/fa";
import companyLogo from '../../assets/logo.png';
function AppFooter(){
    return (
        <section className="footer-container">
            <div className="footer-left">
                <img src={companyLogo} className="footer-logo" alt="Logo" />
            </div>
            <div className="footer-right">
                <div className="footer-right-career">
                    <p className="footer-item"> • Sobre Nosotros</p>
                    <p className="footer-item"> • Trabaja con nosotros</p>
                    <p className="footer-item"> • Soporte</p>
                </div>
                <div className="footer-right-social">
                    <p className="footer-item">Redes Sociales</p>
                    <p className="footer-item"> • <FaYoutube className ="youtube-icon"/>&nbsp;Youtube</p>
                    <p className="footer-item"> • <FaInstagram className ="instagram-icon"/>&nbsp;Instagram</p>
                </div>
            </div>
            <p className="footer-creators">Creado por Neonwaac & SdeathTK</p>
        </section>
    )
}
export default AppFooter;