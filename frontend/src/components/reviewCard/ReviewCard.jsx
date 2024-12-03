import React,{useState, useEffect} from "react";
import './ReviewCard.css';
import axios from "axios";
function ReviewCard({ id, valor, descripcion, timestamp, usuarioId, onDelete }) {
    const [currentUserId, setCurrentUserId] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("usuario"));
        if (storedUser && storedUser.username) {
            setCurrentUserId(storedUser.username);
        }
    }, []);

    async function handleDeleteReview(id) {
        try {
            await axios.delete(`http://localhost:8007/api/reviews/${id}`);
            alert("Review eliminada correctamente");
            onDelete(id);
        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar la review");
        }
    }

    const stars = valor && !isNaN(valor) && valor > 0 ? "⭐".repeat(Math.min(valor, 5)) : "⭐";

    return (
        <div className="review-card">
            <div className="review-left">
                <p className="review-card-user">{usuarioId || "Usuario desconocido"}</p>
                <h3 className="review-card-stars">{stars}</h3>
            </div>
            <div className="review-center">
                <p className="review-card-description">{descripcion || "Sin descripción"}</p>
            </div>
            <div className="review-right">
                <p className="review-card-date">
                    Realizada el:
                    <br />
                    {timestamp ? new Date(timestamp).toLocaleDateString() : "Fecha desconocida"}
                </p>
                {String(currentUserId) === String(usuarioId) && (
                    <button className="review-card-button" onClick={() => handleDeleteReview(id)}>
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}

export default ReviewCard;


