import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../../assets/Icons/profile-icon.svg';
import style from './style.module.css';

function ParcialHeader() {
  const pageTitle = useLocation().pathname
    .split('/')[1]
    .replace(/(^\w{1})|(-\w{1})/g, (match) => match.toUpperCase())
    .replace(/-/g, ' ');

  return (
    <header>
      <section className={ style.headerMainSection }>
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
      </section>
    </header>
  );
}

export default ParcialHeader;
