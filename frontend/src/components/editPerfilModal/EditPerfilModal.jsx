import React, { useState, useEffect } from "react";
import "./EditPerfilModal.css";

function EditPerfilModal({ id, username, contraseña, correo, fecha, isOpen, onClose, onProfileUpdated }) {
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(contraseña);
  const [newCorreo, setNewCorreo] = useState(correo);
  const [newFecha, setNewFecha] = useState(fecha);

  // Actualiza los valores iniciales cuando las props cambian
  useEffect(() => {
    if (isOpen) {
      setNewUsername(username);
      setNewPassword(contraseña);
      setNewCorreo(correo);
      setNewFecha(fecha);
    }
  }, [isOpen, username, contraseña, correo, fecha]);

  const handleSaveChanges = async () => {
    const updatedUser = {
      username: newUsername,
      contraseña: newPassword,
      correo: newCorreo,
      fecha: new Date(newFecha).toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:8007/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el perfil.");
      }

      const result = await response.json();
      onProfileUpdated(result);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal-content">
        <h2>Editar Perfil</h2>
        <label className="edit-profile-modal-label">Nombre de Usuario:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="edit-profile-modal-input"
        />
        <label className="edit-profile-modal-label">Contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="edit-profile-modal-input"
        />
        <label className="edit-profile-modal-label">Correo Electrónico:</label>
        <input
          type="email"
          value={newCorreo}
          onChange={(e) => setNewCorreo(e.target.value)}
          className="edit-profile-modal-input"
        />
        <label className="edit-profile-modal-label">Fecha de Nacimiento:</label>
        <input
          type="date"
          value={newFecha?newFecha.split("T")[0]:""} 
          onChange={(e) => setNewFecha(e.target.value)}
          className="edit-profile-modal-input"
        />
        <div className="edit-profile-modal-actions">
          <button className="edit-profile-modal-save" onClick={handleSaveChanges}>
            Guardar Cambios
          </button>
          <button className="edit-profile-modal-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditPerfilModal;

