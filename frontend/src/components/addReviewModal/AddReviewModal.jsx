import React, { useState } from "react";
import './AddReviewModal.css';

function AddReviewModal({ isOpen, onClose, onReviewAdded }) {
  const [valor, setValor] = useState(5);
  const [descripcion, setDescripcion] = useState("");

  const handleAddReview = async () => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    const nuevaReseña = {
      valor: valor, 
      descripcion: descripcion,
      id_usuario: storedUser.id,
      timestamp: new Date().toISOString(),
      nombre_usuario: storedUser.username,
    };

    try {
      const response = await fetch("http://localhost:8007/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaReseña),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al añadir la reseña.");
      }
      const result = await response.json();
      onReviewAdded({
        id: nuevaReseña.id,
        valor: nuevaReseña.valor,
        descripcion: nuevaReseña.descripcion,
        nombre_usuario: nuevaReseña.nombre_usuario,
        timestamp: nuevaReseña.timestamp
      });
      onClose();
    } catch (error) {
      console.error("Error al añadir la reseña:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Añadir Reseña</h2>
          <h3 className="modal-input-title">Valoración en <span className="modal-input-title-stars" >Estrellas</span></h3>
          <div className="radio-star-rate">
          <input type="radio" name="star" onChange={(e) => setValor(1)} />
          <input type="radio" name="star" onChange={(e) => setValor(2)} />
          <input type="radio" name="star" onChange={(e) => setValor(3)} />
          <input type="radio" name="star" onChange={(e) => setValor(4)}/>
          <input type="radio" name="star" onChange={(e) => setValor(5)} />
          </div>
          <div id="real-star-rate" className="real-star-rate">
          {[...Array(valor)].map((_, index) => (
            <span key={index} className="star">
              ⭐
            </span>
          ))}
        </div>
          <h3 className="modal-input-title">Descripción:</h3>
          <textarea
            value={descripcion}
            onChange={(e) => {
              if (e.target.value.length <= 130) {
                setDescripcion(e.target.value); // Solo actualiza si el límite no se supera
              }
            }}
            maxLength="130"
            rows="4"
            required
          />
        <div className="modal-actions">
          <button className="modal-actions-enviar"onClick={handleAddReview}>Enviar</button>
          <button className="modal-actions-cancelar"onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
export default AddReviewModal;

