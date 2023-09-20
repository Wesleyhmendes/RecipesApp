import { useState, useEffect } from 'react';

type FetchType = {
  userSearch: string;
  searchType: 'ingredient' | 'name' | 'firstLetter' | string;
};

function useFetch({ userSearch, searchType }: FetchType) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
            window.alert('Your search must have only 1 (one) character');
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
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userSearch, searchType]);

  return { data, loading };
}

export default useFetch;
