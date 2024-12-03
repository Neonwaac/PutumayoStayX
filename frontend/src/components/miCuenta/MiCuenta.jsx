import React, { useState, useEffect } from "react";
import "./MiCuenta.css";
import EditPerfilModal from "../editPerfilModal/EditPerfilModal";

function MiCuenta() {
  const [usuario, setUsuario] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      setUsuario(JSON.parse(usuarioLocal));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleProfileUpdated = (updatedUser) => {
    setUsuario(updatedUser);
    localStorage.setItem("usuario", JSON.stringify(updatedUser));
  };

  return (
    <section className="my-account-section">
      <div className="account-container">
        <h1 className="account-container-title">Mi perfil</h1>
        <img className="account-container-element-img" src="/default.png" alt="Perfil" />
        <h1 className="account-container-element-name">{usuario.username}</h1>
        <h2 className="account-container-element-title">Correo Electrónico</h2>
        <div className="account-container-element">
          <h2 className="account-container-element-data">{usuario.correo}</h2>
        </div>
        <h2 className="account-container-element-title">Fecha de Nacimiento</h2>
        <div className="account-container-element">
          <h2 className="account-container-element-data">
            {usuario.fecha ? usuario.fecha.split("T")[0] : "Registra tu fecha"}
          </h2>
        </div>
        <button
          className="account-container-button"
          onClick={() => setModalOpen(true)}
        >
          Editar Datos
        </button>
      </div>
      <EditPerfilModal
        id={usuario.id}
        username={usuario.username}
        contraseña={usuario.contraseña}
        correo={usuario.correo}
        fecha={usuario.fecha}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onProfileUpdated={handleProfileUpdated}
      />
    </section>
  );
}

export default MiCuenta;
