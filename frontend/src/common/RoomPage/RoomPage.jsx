import React, {useState, useEffect} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import AppFooter from "../../components/appFooter/AppFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RoomPage.css'
import RoomCard from "../../components/roomCard/RoomCard";
function RoomPage(){
    const [user, setUser] = useState(null);
    const [roomsData, setRoomsData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("usuario"));
        if (storedUser) {
          setUser(storedUser);
        } else {
          navigate("/")
        }
      }, [navigate]);
      useEffect(() => {
        const fetchRoomsData = async () => {
          try {
            const response = await axios.get("http://localhost:8007/api/habitaciones");
            setRoomsData(response.data);
          } catch (error) {
            console.error("Error al cargar las habitaciones", error);
          }
        };
        fetchRoomsData();
    }, []);
    return(
        <section className="room-page">
            <NavigationBar/>
            <div className="room-cards-container">
                <h1 className="room-page-container-title">Habitaciones Disponibles</h1>
                {roomsData.map((habitacion) => (
                    <RoomCard
                    key={habitacion.id}
                    id={habitacion.id}
                    nombre={habitacion.nombre}
                    descripcion={habitacion.descripcion}
                    capacidad={habitacion.capacidad}
                    foto={habitacion.foto}
                    precio={habitacion.precio}
                    categoria={habitacion.categoria}
                    />
                ))}
            </div>
            <AppFooter/>
        </section>
    )
}
export default RoomPage;