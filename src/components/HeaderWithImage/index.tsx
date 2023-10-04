import { useLocation } from 'react-router-dom';
import style from './style.module.css';

function HeaderWithImage() {
  const pageTitle = useLocation().pathname
    .split('/')[1]
    .replace(/(^\w{1})|(-\w{1})/g, (match) => match.toUpperCase())
    .replace(/-/g, ' ');

  return (
    <header>
      <section className={ style.headerWithImageMainSection }>
        <div className={ style.headerWithImageGradient } />
        <div className={ style.headerWithImageGradient2 } />
        <img
          className={ style.headerWithImageImg }
          src="src/assets/Images/yellow-header-mobile.png"
          alt="frutas"
        />
        <div className={ style.headerWithImagePageNameAndProfile }>
          <h1 className={ style.headerWithImagePageName } data-testid="page-title">
            { pageTitle }
          </h1>
        </div>
      </section>
    </header>
  );
}

export default HeaderWithImage;
