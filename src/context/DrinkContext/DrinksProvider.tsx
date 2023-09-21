import { useState } from 'react';
import { DrinkType, FetchType } from '../../type';
import DrinksContext from './DrinksContext';

type DrinksProviderProps = {
  children: React.ReactNode;
};

export default function DrinksProvider({ children }: DrinksProviderProps) {
  const [drinksData, setDrinksData] = useState<DrinkType[] | null>([]);

  const fetchDataDrinks = async ({ radioSelected, search }: FetchType) => {
    let url = '';
    console.log(radioSelected);
    switch (radioSelected) {
      case 'ingredient':
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
        break;
      case 'name':
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
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
    if (response) {
      const jsonData = await response.json();
      setDrinksData(jsonData.drinks);
    } else {
      setDrinksData(null);
    }
  };

  const value = {
    drinksData,
    fetchDataDrinks,
  };

  return (
    <DrinksContext.Provider value={ value }>
      {children}
    </DrinksContext.Provider>
  );
}
