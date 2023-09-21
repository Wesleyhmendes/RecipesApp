import { useState } from 'react';
import { DrinkType } from '../../type';
import DrinksContext from './DrinkContext';

type DrinksProviderProps = {
  children: React.ReactNode;
};

export default function DrinkProvider({ children }: DrinksProviderProps) {
  const [apiResponseDrinks, setApiResponse] = useState<DrinkType[]>([]);

  const setApiDrinks = (param: DrinkType[]) => {
    setApiResponse(param);
  };

  const value = {
    apiResponseDrinks,
    setApiDrinks,
  };

  return (
    <DrinksContext.Provider value={ value }>
      {children}
    </DrinksContext.Provider>
  );
}
