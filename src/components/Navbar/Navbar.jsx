import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

import "./Navbar.css";

export default function Navbar() {

  const [openSearch, setOpenSearch] = useState(false);
  const [value, setValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!value.trim()) return;

    navigate(`/search/${value}`);
    setOpenSearch(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (id) => {
    const go = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(go, 300);
    } else {
      go();
    }

    closeMenu();
  };

  return (
    
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
        onClick={() => {
          setValue("");
          closeMenu();
        }}
      >
        AnimeVault
      </Link>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li>
          <button onClick={() => scrollToSection("top")}>
            Top Anime
          </button>
        </li>

        <li>
          <button onClick={() => scrollToSection("action")}>
            Action Anime
          </button>
        </li>

        <li>
          <button onClick={() => scrollToSection("romance")}>
            Romance Anime
          </button>
        </li>

      </ul>

      <div className="nav-icons">

        <div className="search-wrapper">

          {openSearch && (
            <input
              autoFocus
              className="search-input"
              placeholder="Search anime..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          )}

          <button
            className="icon-btn"
            onClick={() => setOpenSearch((prev) => !prev)}
          >
            <FaSearch />
          </button>

        </div>

        <button className="icon-btn" onClick={handleSearch}>
        </button>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

    </nav>
  );
}