import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DrinkType, FetchType } from '../../type';
import DrinksContext from './DrinksContext';

type DrinksProviderProps = {
  children: React.ReactNode;
};

export default function DrinksProvider({ children }: DrinksProviderProps) {
  const [drinksData, setDrinksData] = useState<DrinkType[] | null>([]);
  const navigate = useNavigate();

  const fetchDataDrinks = async ({ radioSelected, search }: FetchType) => {
    let url = '';
    switch (radioSelected) {
      case 'ingredient':
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
        break;
      case 'name':
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
        break;
      case 'category':
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`;
        break;
      case 'clear':
        url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        break;
      case 'firstLetter':
        if (search.length > 1) {
          window.alert('Your search must have only 1 (one) character');
        } else {
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
        }
        break;
      default:
        break;
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    if (jsonData.drinks) {
      setDrinksData(jsonData.drinks);
      if (jsonData.drinks.length === 1) navigate(`/drinks/${jsonData.drinks[0].idDrink}`);
    } else {
      alert("Sorry, we haven't found any recipes for these filters.");
    }
  };

  const fetchDefaultData = async () => {
    const defaultUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(defaultUrl);
    if (response) {
      const jsonData = await response.json();
      setDrinksData(jsonData.drinks);
    } else {
      setDrinksData(null);
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const value = {
    drinksData,
    fetchDataDrinks,
  };

  return (
    <DrinksContext.Provider value={ value }>
      { children }
    </DrinksContext.Provider>
  );
}
