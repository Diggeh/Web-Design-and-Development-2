import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../styles/SearchBar.css";

const CATEGORIES = ["All", "Electronics", "Fashion", "Home"];

const SearchBar = ({ onSearch, onCategoryChange, currentCategory }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar-container" id="search-bar">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
            id="search-input"
          />
        </div>
      </form>
      <div className="category-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${currentCategory === cat ? "active" : ""}`}
            onClick={() => onCategoryChange(cat)}
            id={`category-${cat.toLowerCase()}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
