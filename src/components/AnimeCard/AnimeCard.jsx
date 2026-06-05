import { useNavigate } from "react-router-dom";
import "./AnimeCard.css";

export default function AnimeCard({ anime }) {

  const navigate = useNavigate();

  if (!anime) return null;

  const image =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url;

  return (
    
    <div className="anime-card">

      <img src={image} alt={anime.title} />

      <div className="anime-overlay">

        <h3>{anime.title}</h3>

        <button
          className="view-btn"
          onClick={() => navigate(`/anime/${anime.mal_id}`)}
        >
          View Details
        </button>

      </div>

    </div>
  );
}