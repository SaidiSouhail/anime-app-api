import "./Footer.css";

export default function Footer() {
    
  return (

    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>AnimeVault</h2>
          <p>
            Discover the best anime in one place — action, romance, and trending shows.
            Built with React and API.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#top">Top Anime</a>
          <a href="#action">Action Anime</a>
          <a href="#romance">Romance Anime</a>
        </div>

        <div className="footer-info">
          <h3>About</h3>
          <p>Powered by API</p>
          <p>React Frontend Project</p>
          <p>© {new Date().getFullYear()} AnimeVault</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>Made with ❤️ for anime fans</p>
      </div>

    </footer>
  );
}