import React, {useState, useEffect} from "react";
import NavigationBar from "../../components/navigationBar/NavigationBar";
import AppFooter from "../../components/appFooter/AppFooter";
import { useNavigate } from "react-router-dom";
import AddReviewModal from "../../components/addReviewModal/AddReviewModal";
import axios from "axios";
import './ReviewPage.css'
import RoomCard from "../../components/roomCard/RoomCard";
import ReviewCard from "../../components/reviewCard/ReviewCard";
function ReviewPage(){
    const [user, setUser] = useState(null);
    const [reviewsData, setReviewsData] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("usuario"));
        if (storedUser) {
          setUser(storedUser);
        } else {
          navigate("/");
        }
      }, [navigate]);
      useEffect(() =>{
        const fetchReviewsData = async () => {
            try {
              const response = await axios.get("http://localhost:8007/api/reviews");
              setReviewsData(response.data);
            } catch (error) {
              console.error("Error al cargar las reseñas", error);
            }
          };
        fetchReviewsData();
      },[])
      const handleReviewDeleted = (id) => {
        setReviewsData((prevReviews) => prevReviews.filter((review) => review.id !== id));
      };
    
      const handleReviewAdded = (newReview) => {
        setReviewsData((prevReviews) => [...prevReviews, newReview]);
      };
    return(
        <section className="review-page">
            <NavigationBar/>
            <div className="review-cards-container">
                <h1 className="review-page-container-title">Reseñas de Usuarios</h1>

        {reviewsData.length > 0 ? (
          reviewsData.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              valor={review.valor}
              descripcion={review.descripcion}
              timestamp={review.timestamp}
              usuarioId={review.nombre_usuario}
              onDelete={handleReviewDeleted}
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
            <AppFooter/>
        </section>
    )
}
export default ReviewPage