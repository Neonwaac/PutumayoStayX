import React, { useEffect, useState } from 'react';
import NavigationBar from "../../components/navigationBar/NavigationBar";
import AppFooter from "../../components/appFooter/AppFooter";
import MiCuenta from "../../components/miCuenta/MiCuenta";
import MisReservas from "../../components/misReservas/MisReservas";
import MiHistorial from "../../components/miHistorial/MiHistorial";
import './DashboardPage.css';

function DashboardPage() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('miCuenta'); 

  useEffect(() => {
    const usuarioLocal = localStorage.getItem('usuario');
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal));
    } else {
      window.location.href = "/login";
    }
  }, []);

  function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = "/login";
  }


  const renderVista = () => {
    if (vista === 'miCuenta') {
      return <MiCuenta />; 
    }
    if (vista === 'misReservas') {
      return <MisReservas />;
    }
    return null;
  };
  

  return (
    <section className="user-dashboard">
      <NavigationBar />
      <div className="dashboard-container">
        <div className="dashboard-menu-container">
        <div className="dashboard-menu">
          <div className="dashboard-menu-title">Menú de Usuario</div>
          <div className="dashboard-menu-button" onClick={() => setVista('miCuenta')}>Mi Perfil</div>
          <div className="dashboard-menu-button" onClick={() => setVista('misReservas')}>Reservas</div>
          <div className="dashboard-menu-button cerrar-sesion" onClick={cerrarSesion}>Cerrar Sesión</div>
        </div>
        </div>
        <div className="dashboard-content">{renderVista()}</div>
      </div>
      <AppFooter />
    </section>
  );
}

export default DashboardPage;
