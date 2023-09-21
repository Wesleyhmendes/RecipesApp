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

  if (mealsData.length === 1 && location === '/meals') {
    navigate(`/meals/${mealsData[0].idMeal}`);
  }

  if (drinksData.length === 1 && location === '/drinks') {
    navigate(`/drinks/${drinksData[0].idDrink}`);
  }

  return (
    <>
      <Header />
      { location === '/meals' ? (
        mealsData.map((meal) => (
          <div key={ meal.idMeal }>{ meal.strCategory }</div>
        ))
      ) : (
        drinksData.map((drink) => (
          <div key={ drink.idDrink }>{ drink.strDrink }</div>
        ))
      ) }
      <div>Recipes</div>
    </>
  );
}
