import { useState } from 'react';
import { FetchType, MealType } from '../../type';
import MealsContext from './MealsContext';

type MealsProviderProps = {
  children: React.ReactNode;
};

export default function MealsProvider({ children }: MealsProviderProps) {
  const [mealsData, setMealsData] = useState<MealType[]>([]);

  const fetchDataMeals = async ({ radioSelected, search }: FetchType) => {
    let url = '';
    switch (radioSelected) {
      case 'ingredient':
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
        break;
      case 'name':
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
        break;
      case 'firstLetter':
        if (search.length > 1) {
          window.alert('erro');
        } else {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
        }
        break;
      default:
        break;
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    setMealsData(jsonData.meals);
  };

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
