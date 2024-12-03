import React, { useState } from "react";
import AddReservaModal from "../addReservaModal/AddReservaModal";
import "./RoomCard.css";

function RoomCard({ id, nombre, descripcion, capacidad, foto, precio, categoria }) {
  const [isReservaModalOpen, setReservaModalOpen] = useState(false);

  const handleReservaAdded = (reserva) => {
    console.log("Reserva creada:", reserva);
  };

  return (
    <div className="room-card">
      <img src={foto} alt={nombre} className="room-card-image" />
      <div className="room-card-content">
        <h3 className="room-card-title">{nombre}</h3>
        <p className="room-card-description">{descripcion}</p>
        <p className="room-card-info">✔️ Capacidad para {capacidad} personas</p>
        <p className="room-card-info">✔️ Desde ${precio} por noche</p>
        <p className="room-card-info">
          ✔️ Tipo de{" "}
          {categoria === 1
            ? "Habitación Normal"
            : categoria === 2
            ? "Habitación Ejecutiva"
            : "Habitación de Lujo"}
        </p>
        <button
          className="room-card-button"
          onClick={() => setReservaModalOpen(true)}
        >
          Reservar Ahora
        </button>
      </div>
      <AddReservaModal
        isOpen={isReservaModalOpen}
        onClose={() => setReservaModalOpen(false)}
        onReservaAdded={handleReservaAdded}
        id={id}
        precio={precio}
        nombre={nombre}
      />
    </div>
  );
}

export default RoomCard;

