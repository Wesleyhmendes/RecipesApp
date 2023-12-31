import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar';
import profileIcon from '../../assets/Icons/profile-icon.svg';
import whiteHeadPhoto from '../../assets/Images/white-header-photo-desktop(2).jpg';
import searchIcon from '../../images/searchIcon.svg';
import style from './style.module.css';

function Header() {
  const [searchVisible, setSearchVisible] = useState(false);

  const pathName = useLocation().pathname;

  const pageTitle = useLocation().pathname
    .split('/')[1]
    .replace(/(^\w{1})|(-\w{1})/g, (match) => match.toUpperCase())
    .replace(/-/g, ' ');

  const showSearchIcon = () => {
    return (pathName === '/meals' || pathName === '/drinks');
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header>
      <section className={ style.headerMainSection }>
        <div className={ style.headerGradient } />
        <div className={ style.headerGradient2 } />
        <img
          className={ style.headerImg }
          src={ whiteHeadPhoto }
          alt="frutas"
        />
        <div className={ style.headerPageNameAndProfile }>
          <h1 className={ style.headerPageName } data-testid="page-title">
            { pageTitle }
          </h1>
          <Link to="/profile">
            <img
              className={ style.headerPageProfileIcon }
              src={ profileIcon }
              alt="Profile"
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
        { showSearchIcon() && (
          <div className={ style.headerLupeDiv }>
            <button className={ style.headerLupeBtn } onClick={ toggleSearch }>
              <img
                className={ style.headerLupeImg }
                src={ searchIcon }
                alt="Search"
                data-testid="search-top-btn"
              />
            </button>
          </div>
        ) }
        { searchVisible && (
          <div>
            <SearchBar />
          </div>
        ) }
      </section>
    </header>
  );
}

export default Header;
