import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../services/api";
import "./AnimeDetails.css";

export default function AnimeDetails() {

  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchAnime = async () => {
      try {
        setLoading(true);

        const data = await getAnimeDetails(id);

        setAnime(data?.data || null);

      } catch (err) {
        console.error("Failed to load anime:", err);
        setAnime(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        Loading anime...
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="error-screen">
        Anime not found 😢
      </div>
    );
  }

  return (
    <div className="anime-details">

      <div className="anime-details-container">

        <img
          src={
            anime.images?.jpg?.large_image_url ||
            anime.images?.jpg?.image_url
          }
          alt={anime.title}
        />

        <div className="info">

          <h1>{anime.title}</h1>

          <p className="desc">
            {anime.synopsis || "No description available."}
          </p>

          <div className="meta">
            <p>⭐ Score: {anime.score || "N/A"}</p>
            <p>🎬 Episodes: {anime.episodes || "Unknown"}</p>
            <p>📌 Status: {anime.status || "Unknown"}</p>
            <p>🏷️ Type: {anime.type || "Anime"}</p>
          </div>

        </div>

      </div>

    </div>
  );
}