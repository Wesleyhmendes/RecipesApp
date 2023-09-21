import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar';

function Header() {
  const [searchVisible, setSearchVisible] = useState(false);

  const pageTitle = useLocation().pathname;
  const showSearchIcon = true;

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header>
      <div>
        <SearchBar />
        <Link to="/profile">
          <img
            src="src/images/profileIcon.svg"
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      { showSearchIcon && (
        <div>
          <button onClick={ toggleSearch }>
            <img
              src="src/images/searchIcon.svg"
              alt="Search"
              data-testid="search-top-btn"
            />
          </button>
        </div>
      ) }
      { searchVisible && (
        <div>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
          />
        </div>
      ) }
      <h1 data-testid="page-title">{ pageTitle }</h1>
    </header>
  );
}

export default Header;
