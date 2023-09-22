import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MealsContext from '../../context/MealContext/MealsContext';
import DrinksContext from '../../context/DrinkContext/DrinksContext';
import Category from '../../components/Category';

export default function Recipes() {
  const { drinksData } = useContext(DrinksContext);
  const { mealsData } = useContext(MealsContext);

  const location = useLocation().pathname;

  if (location === '/meals' && !mealsData) {
    window.alert("Sorry, we haven't found any recipes for these filters.");
  }

  if (location === '/drinks' && !drinksData) {
    window.alert("Sorry, we haven't found any recipes for these filters.");
  }

  return (
    <main>
      <Category />
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
    </main>
  );
}
