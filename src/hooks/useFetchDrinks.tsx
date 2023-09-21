import { useState, useEffect } from 'react';
import { FetchType } from '../type';

function useFetchDrinks({ userSearch, searchType }: FetchType) {
  const [dataDrinks, setDataDrinks] = useState([]);
  const [loadingDrinks, setLoadingDrinks] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      switch (searchType) {
        case 'ingredient':
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${userSearch}`;
          break;
        case 'name':
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userSearch}`;
          break;
        case 'firstLetter':
          if (userSearch.length > 1) {
            window.alert('erro');
          } else {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${userSearch}`;
          }
          break;
        default:
          break;
      }
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setDataDrinks(jsonData);
        setLoadingDrinks(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoadingDrinks(false);
      }
    };
    fetchData();
  }, [userSearch, searchType]);
  return { dataDrinks, loadingDrinks };
}

export default useFetchDrinks;
