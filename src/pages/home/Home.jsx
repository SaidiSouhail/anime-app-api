import AnimeSlider from "../../components/AnimeSlider/AnimeSlider";
import "./Home.css";
import Footer from "../../components/Footer/Footer";

export default function Home() {

  return (
    
    <div className="home-page">

      <section className="hero">
        <div className="hero-content">
          <h1>Discover Anime World</h1>
          <p>A modern anime discovery web app built with React and powered by a real anime API, offering smooth browsing of trending, action, and romance titles</p>
        </div>
      </section>

      <section id="top" className="anime-section">
        <AnimeSlider
          title="🔥 Top Anime"
          fetchUrl="https://api.jikan.moe/v4/top/anime"
        />
      </section>

      <section id="action" className="anime-section">
        <AnimeSlider
          title="⚔️ Action Anime"
          fetchUrl="https://api.jikan.moe/v4/anime?genres=1"
        />
      </section>

      <section id="romance" className="anime-section">
        <AnimeSlider
          title="💖 Romance Anime"
          fetchUrl="https://api.jikan.moe/v4/anime?genres=22"
        />
      </section>

      <Footer />

    </div>
  );
}