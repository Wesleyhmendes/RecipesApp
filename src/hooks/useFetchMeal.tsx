import { useState, useEffect } from 'react';
import { FetchType } from '../type';

function useFetchMeal({ userSearch, searchType }: FetchType) {
  const [dataMeals, setDataMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      switch (searchType) {
        case 'ingredient':
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${userSearch}`;
          break;
        case 'name':
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userSearch}`;
          break;
        case 'firstLetter':
          if (userSearch.length > 1) {
            window.alert('erro');
          } else {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userSearch}`;
          }
          break;
        default:
          break;
      }
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setDataMeals(jsonData);
        setLoadingMeals(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoadingMeals(false);
      }
    };
    fetchData();
  }, [userSearch, searchType]);
  return { dataMeals, loadingMeals };
}

export default useFetchMeal;
