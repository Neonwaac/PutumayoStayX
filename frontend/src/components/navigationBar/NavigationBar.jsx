import React from "react";
import './NavigationBar.css'
import { Link } from "react-router-dom";
import companyLogo from '../../assets/logo.png';
function NavigationBar(){
    return(
        <section className="nav-container">
            <div className="nav-left">
                <img src={companyLogo} className="nav-logo" alt="Logo" />
            </div>
            <div className="nav-right">
                <div className="nav-link-container">
                    <Link className ="nav-link" to="/home">Home</Link>
                </div>
                <div className="nav-link-container">
                    <Link className ="nav-link" to="/rooms">Habitaciones</Link>
                </div>
                <div className="nav-link-container">
                    <Link className ="nav-link" to="/reviews">Reseñas</Link>    
                </div>
                <div className="nav-link-container">
                    <Link className ="nav-link" to="/dashboard">Cuenta</Link>
                </div>  
            </div>
        </section>
    )
}

export default NavigationBar