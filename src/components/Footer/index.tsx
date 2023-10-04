import { Link, useLocation } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../assets/Icons/meal-filter.svg';
import goBackIcon from '../../assets/Icons/go-back-icon.svg';
import homeIcon from '../../assets/Icons/home-icon.svg';
import profileIcon from '../../assets/Icons/profile-icon.svg';
import style from './style.module.css';

export default function Footer() {
  const location = useLocation().pathname;
  const isMealsRoute = location.includes('/meals');

  return (
    <footer
      className={ style.footerMain }
      data-testid="footer"
    >
      <div className={ style.footerMainDiv }>
        <Link to={ isMealsRoute ? '/drinks' : '/meals' }>
          <img
            className={ style.footerGoBackIcon }
            src={ goBackIcon }
            alt="icone de voltar"
          />
        </Link>

        <Link to="/drinks">
          <img
            className={
              `${style.footerDrinkIcon}
              ${location === '/drinks' ? style.footerSelected : ''}`
            }
            src={ drinkIcon }
            alt="icone de drink"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <img
            className={ style.footerHomeIcon }
            src={ homeIcon }
            alt="icone de home"
          />
        </Link>
        <Link to="/meals">
          <img
            className={
              `${style.footerMealIcon} ${isMealsRoute ? style.footerSelected : ''}`
            }
            src={ mealIcon }
            alt="icone de meal"
            data-testid="meals-bottom-btn"
          />
        </Link>
        <Link to="/profile">
          <img
            className={ style.footerProfileIcon }
            src={ profileIcon }
            alt="icone de profile"
          />
        </Link>
      </div>
    </footer>
  );
}
