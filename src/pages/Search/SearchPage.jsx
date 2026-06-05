import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SearchPage.css";

export default function SearchPage() {

  const { query } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!query) return;

    let ignore = false;

    setResults([]);
    setLoading(true);

    const fetchAnime = async () => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${query}&limit=12`
        );

        const data = await res.json(); 

        if (!ignore) {
          setResults(data?.data || []);
        }

      } catch (err) {
        console.log("Search error:", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchAnime();

    return () => {
      ignore = true;
    };

  }, [query]);

  if (!query) return null;

  return (
    <div className="search-page">

      <h2 className="search-title">
        Results for: <span>{query}</span>
      </h2>

      {loading && <p className="loading">Loading anime...</p>}

      <div className="results-grid">

        {results.map((anime) => (

          <div
            key={anime.mal_id}
            className="search-card"
            onClick={() => navigate(`/anime/${anime.mal_id}`)}
            style={{ cursor: "pointer" }}
          >

            <img
              src={anime.images?.jpg?.large_image_url}
              alt={anime.title}
            />

            <div className="overlay">

              <h3>{anime.title}</h3>

              <button
                className="view-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/anime/${anime.mal_id}`);
                }}
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}