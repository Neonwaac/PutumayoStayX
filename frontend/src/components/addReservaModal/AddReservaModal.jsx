import React, { useState, useEffect } from "react";
import './AddReservaModal.css';

function AddReservaModal({ id, nombre, precio, isOpen, onClose, onReservaAdded }) {
  const [monto, setMonto] = useState(0);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");

  useEffect(() => {
    if (fechaIngreso && fechaSalida) {
      const diffInDays =
        (new Date(fechaSalida) - new Date(fechaIngreso)) / (1000 * 60 * 60 * 24);
      if (diffInDays > 0) {
        setMonto(diffInDays * precio);
      } else {
        setMonto(0);
      }
    }
  }, [fechaIngreso, fechaSalida, precio]);

  const handleAddReserva = async () => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));

    const nuevaReserva = {
      monto: parseFloat(monto),
      fecha_ingreso: new Date(fechaIngreso).toISOString(),
      fecha_salida: new Date(fechaSalida).toISOString(),
      estado: 1,
      id_usuario: storedUser.id,
      id_habitacion: id,
      habitacion_nombre: nombre,
    };

    try {
      const response = await fetch("http://localhost:8007/api/reservas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaReserva),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear la reserva.");
      }

      const result = await response.json();
      onReservaAdded(result);
      onClose();
    } catch (error) {
      console.error("Error al crear la reserva:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reserva-modal-overlay">
      <div className="reserva-modal-content">
        <h2>Crear Reserva</h2>
        <h3>{nombre}</h3> {/* Subtítulo con el nombre */}
        <label className="reserva-modal-label">Monto:</label>
        <input
          type="number"
          value={monto}
          readOnly
          className="reserva-modal-input"
        />
        <label className="reserva-modal-label">Fecha de Ingreso:</label>
        <input
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          className="reserva-modal-input"
        />
        <label className="reserva-modal-label">Fecha de Salida:</label>
        <input
          type="date"
          value={fechaSalida}
          onChange={(e) => setFechaSalida(e.target.value)}
          className="reserva-modal-input"
        />
        <div className="reserva-modal-actions">
          <button className="reserva-modal-enviar" onClick={handleAddReserva}>
            Reservar
          </button>
          <button className="reserva-modal-cancelar" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReservaModal;