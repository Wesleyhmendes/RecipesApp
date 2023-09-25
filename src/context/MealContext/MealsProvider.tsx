import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchType, MealType } from '../../type';
import MealsContext from './MealsContext';

type MealsProviderProps = {
  children: React.ReactNode;
};

export default function MealsProvider({ children }: MealsProviderProps) {
  const [mealsData, setMealsData] = useState<MealType[]>([]);
  const navigate = useNavigate();

  const fetchDataMeals = async ({ radioSelected, search }: FetchType) => {
    let url = '';
    switch (radioSelected) {
      case 'ingredient':
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
        break;
      case 'name':
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
        break;
      case 'category':
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`;
        break;
      case 'clear':
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        break;
      case 'firstLetter':
        if (search.length > 1) {
          window.alert('Your search must have only 1 (one) character');
        } else {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
        }
        break;
      default:
        break;
    }

    const response = await fetch(url);
    const jsonData = await response.json();
    if (jsonData.meals) {
      setMealsData(jsonData.meals);
      if (jsonData.meals.length === 1
        && radioSelected !== 'category') navigate(`/meals/${jsonData.meals[0].idMeal}`);
    } else alert("Sorry, we haven't found any recipes for these filters.");
  };

  const fetchDefaultData = async () => {
    const defaultUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(defaultUrl);
    const jsonData = await response.json();
    setMealsData(jsonData.meals);
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const value = {
    mealsData,
    fetchDataMeals,
  };

  return (
    <MealsContext.Provider value={ value }>
      { children }
    </MealsContext.Provider>
  );
}
