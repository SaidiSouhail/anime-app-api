import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "./AnimeSlider.css";

export default function AnimeSlider({ title, fetchUrl, delay = 0 }) {
  
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const navigate = useNavigate();

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const fetchAnime = async (attempt = 1) => {
    try {
      setRetrying(attempt > 1);

      const res = await fetch(fetchUrl);
      const data = await res.json();

      const list = data?.data;

      if (Array.isArray(list) && list.length > 0) {
        setAnime(list);
        setError(false);
        setRetrying(false);
        return;
      }

      if (attempt < 5) {
        await sleep(500 * attempt);
        return fetchAnime(attempt + 1);
      }

      setError(true);
      setAnime([]);
      setRetrying(false);

    } catch (err) {
      console.error(err);

      if (attempt < 5) {
        await sleep(500 * attempt);
        return fetchAnime(attempt + 1);
      }

      setError(true);
      setRetrying(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    setRetrying(false);

    const timer = setTimeout(() => {
      fetchAnime();
    }, delay);

    return () => clearTimeout(timer);
  }, [fetchUrl, delay]);

  if (loading && anime.length === 0) {
    return (
      <section className="anime-slider">
        <h2 className="slider-title">{title}</h2>
        <p className="loading-text">Loading anime...</p>
      </section>
    );
  }

  if (retrying && anime.length === 0) {
    return (
      <section className="anime-slider">
        <h2 className="slider-title">{title}</h2>
        <p className="loading-text">
          Loading anime… 
        </p>
      </section>
    );
  }

  if (error && anime.length === 0) {
    return (
      <section className="anime-slider">
        <h2 className="slider-title">{title}</h2>
        <p className="loading-text">
          Failed to load anime. Please refresh.
        </p>
      </section>
    );
  }

  return (

    <section className="anime-slider">
      <h2 className="slider-title">{title}</h2>

      <div className="slider-wrapper">

        <button ref={prevRef} className="arrow left">
          <FaArrowLeft />
        </button>

        <button ref={nextRef} className="arrow right">
          <FaArrowRight />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop={anime.length > 5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
        >
          {anime.map((item, index) => (
            <SwiperSlide key={item.mal_id}>
              <div
                className="anime-card"
                onClick={() => navigate(`/anime/${item.mal_id}`)}
              >
                <div className="rank-badge">#{index + 1}</div>

                <img
                  src={
                    item.images?.jpg?.large_image_url ||
                    item.images?.jpg?.image_url
                  }
                  alt={item.title}
                />

                <div className="anime-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}