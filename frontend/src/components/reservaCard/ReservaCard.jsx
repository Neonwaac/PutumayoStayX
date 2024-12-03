import React from "react";
import "./ReservaCard.css";

function ReservaCard({ monto, fechaIngreso, fechaSalida, estado, habitacionNombre }) {
  return (
    <div className="reserva-card">
      <div className="reserva-card-header">
        <h3 className="reserva-card-title">{habitacionNombre}</h3>
      </div>
      <div className="reserva-card-body">
        <p className="reserva-card-info">Monto: ${monto}</p>
        <p className="reserva-card-info">Fecha de ingreso: {new Date(fechaIngreso).toLocaleDateString()}</p>
        <p className="reserva-card-info">Fecha de salida: {new Date(fechaSalida).toLocaleDateString()}</p>
        <p className={`reserva-card-estado ${estado === 1 ? "activo" : "inactivo"}`}>
          Estado: {estado === 1 ? "Activo" : "Inactivo"}
        </p>
      </div>
    </div>
  );
}

export default ReservaCard;
