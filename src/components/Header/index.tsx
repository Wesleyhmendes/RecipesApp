import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  pageTitle: string;
  showSearchIcon?: boolean;
}

function Header({ pageTitle, showSearchIcon = true }: HeaderProps) {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header>
      <div>
        <Link to="/profile">
          <img
            src="src/images/profileIcon.svg"
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      {showSearchIcon && (
        <div>
          <button onClick={ toggleSearch }>
            <img
              src="src/images/searchIcon.svg"
              alt="Search"
              data-testid="search-top-btn"
            />
          </button>
        </div>
      )}
      {searchVisible && (
        <div>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
          />
        </div>
      )}
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}

export default Header;
