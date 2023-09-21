import { useState } from 'react';
import { DrinkType } from '../../type';
import DrinksContext from './DrinksContext';

type DrinksProviderProps = {
  children: React.ReactNode;
};

export default function DrinksProvider({ children }: DrinksProviderProps) {
  const [drinksData, setDrinksData] = useState<DrinkType[]>([]);

  const updateDrinks = (drinks: DrinkType[]) => {
    setDrinksData(drinks);
  };

  const value = {
    drinksData,
    updateDrinks,
  };

  return (
    <DrinksContext.Provider value={ value }>
      {children}
    </DrinksContext.Provider>
  );
}
