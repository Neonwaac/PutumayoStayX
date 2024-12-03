import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import "./HomePage.css";
import RoomCard from "../../components/roomCard/RoomCard";
import AppFooter from "../../components/appFooter/AppFooter";
import AddReviewModal from "../../components/addReviewModal/AddReviewModal";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import axios from "axios";

function HomePage() {
  const [roomsData, setRoomsData] = useState([]); // Habitaciones
  const [reviewsData, setReviewsData] = useState([]); // Reseñas
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const response = await fetch("http://localhost:8007/api/habitaciones");
        const result = await response.json();
        setRoomsData(result);
      } catch (error) {
        console.error("Error al cargar las habitaciones", error);
      }
    };

    const fetchReviewsData = async () => {
      try {
        const response = await axios.get("http://localhost:8007/api/reviews");
        setReviewsData(response.data);
      } catch (error) {
        console.error("Error al cargar las reseñas", error);
      }
    };

    fetchRoomsData();
    fetchReviewsData();
  }, []);

  const handleReviewDeleted = (id) => {
    setReviewsData((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };

  const handleReviewAdded = (newReview) => {
    setReviewsData((prevReviews) => [...prevReviews, newReview]);
  };

  const viewAll = (string) => {
    if (string === "rooms") {
      navigate("/rooms")
    }
    if (string === "reviews") {
      navigate("/reviews")
    }
  }

  return (
    <section className="home-page">
      <NavigationBar />
      <div className="room-cards-container">
      <div className="view-all-button-container">
        <h1 className="room-cards-container-title">Habitaciones Disponibles</h1>
        <button onClick={(event)=>{event.preventDefault();viewAll("rooms");}} className="view-all-button">Ver todas las habitaciones</button>
      </div>
        
        {roomsData.slice(0, 2).map((habitacion) => (
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
      <div className="review-cards-container">
      <div className="view-all-button-container">
      <h1 className="review-cards-container-title">Reseñas de Usuarios</h1>
          <button onClick={(event)=>{event.preventDefault();viewAll("reviews");}} className="view-all-button">Ver todas las reseñas</button>
      </div>
        {reviewsData.length > 0 ? (
          reviewsData.slice(0, 2).map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              valor={review.valor}
              descripcion={review.descripcion}
              timestamp={review.timestamp}
              usuarioId={review.nombre_usuario}
              onDelete={handleReviewDeleted} // Pasar la función al hijo
            />
          ))
        ) : (
          <p>No hay reseñas disponibles</p>
        )}
        <div className="review-add-container">
          <button className="review-add" onClick={() => setIsModalOpen(true)}>+</button>
        </div>
        <AddReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onReviewAdded={handleReviewAdded}/>
      </div>
      <AppFooter />
    </section>
  );
}
export default HomePage;
