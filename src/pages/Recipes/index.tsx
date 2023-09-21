import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import MealsContext from '../../context/MealContext/MealsContext';
import DrinksContext from '../../context/DrinkContext/DrinksContext';

export default function Recipes() {
  const { drinksData } = useContext(DrinksContext);
  const { mealsData } = useContext(MealsContext);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  if (mealsData?.length === 1 && location === '/meals') {
    navigate(`/meals/${mealsData[0].idMeal}`);
  }

  if (drinksData?.length === 1 && location === '/drinks') {
    navigate(`/drinks/${drinksData[0].idDrink}`);
  }

  if (location === '/meals' && !mealsData) {
    window.alert('erro');
  }

  if (location === '/drinks' && !drinksData) {
    window.alert('erro');
  }

  return (
    <>
      <Header />
      { location === '/meals' ? (
        mealsData?.slice(0, 12).map((meal, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
            <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
            <img
              width="150"
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        ))
      ) : (
        drinksData?.slice(0, 12).map((drink, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
            <img
              width="150"
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </div>
        ))
      ) }
    </>
  );
}
