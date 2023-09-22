import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinksContext from '../../context/DrinkContext/DrinksContext';
import MealsContext from '../../context/MealContext/MealsContext';

export default function Category() {
  const [categoryButtons, setCategoryButtons] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation().pathname;

  const fetchCategory = async () => {
    let url = '';

    if (location === '/meals') {
      url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    } else {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    if (jsonData.meals) {
      setCategoryButtons(jsonData.meals.slice(0, 5));
    } else {
      setCategoryButtons(jsonData.drinks.slice(0, 5));
    }
    setLoading(false);
  };

  const { fetchDataMeals } = useContext(MealsContext);
  const { fetchDataDrinks } = useContext(DrinksContext);

  const handleClick = (buttonName: string) => {
    if (location === '/meals') {
      fetchDataMeals({
        radioSelected: 'category',
        search: buttonName,
      });
    } else {
      fetchDataDrinks({
        radioSelected: 'category',
        search: buttonName,
      });
    }
  };

  const handleClear = () => {
    if (location === '/meals') {
      fetchDataMeals({
        radioSelected: 'clear',
        search: '',
      });
    }
    if (location === '/drinks') {
      fetchDataDrinks({
        radioSelected: 'clear',
        search: '',
      });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [location]);

  return (
    <div>
      { loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          { categoryButtons.map((category: any) => (
            <button
              onClick={ () => handleClick(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
            >
              { category.strCategory }
            </button>
          )) }
          <button
            onClick={ handleClear }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
      ) }
    </div>
  );
}
