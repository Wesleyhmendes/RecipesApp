import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import MealsContext from '../../context/MealContext/MealsContext';
import DrinksContext from '../../context/DrinkContext/DrinksContext';

export default function Recipes() {
  const { drinksData } = useContext(DrinksContext);
  const { mealsData } = useContext(MealsContext);

  const location = useLocation().pathname;
  console.log(mealsData);
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
