import React, { useEffect, useState } from "react";
import ReservaCard from "../reservaCard/ReservaCard";
import "./MisReservas.css";
import axios from "axios";

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8007/api/reservas/${usuario.id}`
        );
        setReservas(response.data);
      } catch (error) {
        console.error("Error al cargar las reservas:", error);
      }
    };
    if (usuario) {
      fetchReservas();
    }
  }, [usuario]);

  return (
    <section className="mis-reservas-container">
      <h1 className="mis-reservas-title">Mis Reservas</h1>
      <div className="mis-reservas-cards">
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              id={reserva.id}
              monto={reserva.monto}
              fechaIngreso={reserva.fecha_ingreso}
              fechaSalida={reserva.fecha_salida}
              estado={reserva.estado}
              habitacionNombre={reserva.habitacion_nombre}
            />
          ))
        ) : (
          <p>No tienes reservas aún.</p>
        )}
      </div>
    </section>
  );
}

export default MisReservas;
