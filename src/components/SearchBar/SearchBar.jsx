import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  
  const { search, setSearch } = useSearch();
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!search.trim()) return;

    const delay = setTimeout(() => {
      navigate(`/search/${search}`);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="search-container" ref={ref}>

      <FaSearch
        className="search-icon"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anime..."
          className="search-input"
        />
      )}

    </div>
  );
}