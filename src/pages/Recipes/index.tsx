import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import MealsContext from '../../context/apiContext/MealContext';
import DrinksContext from '../../context/apiContext/DrinkContext';

export default function Recipes() {
  const { apiResponseDrinks } = useContext(DrinksContext);
  const { apiResponseMeals } = useContext(MealsContext);

  const location = useLocation().pathname;
  console.log(apiResponseMeals);
  return (
    <>
      <Header />
      {/* { location === '/meals' ? (
        apiResponseMeals.map((meal) => (
          <div key={ meal.idMeal }>{ meal.strCategory }</div>
        ))
      ) : (
        apiResponseDrinks.map((drink) => (
          <div key={ drink.idDrink }>{ drink.strDrink }</div>
        ))
      ) } */}
      <div>Recipes</div>
    </>
  );
}
