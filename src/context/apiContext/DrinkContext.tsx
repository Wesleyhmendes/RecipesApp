import { createContext } from 'react';
import { DrinkType } from '../../type';

export type DrinksContextType = {
  apiResponseDrinks: DrinkType[];
  setApiDrinks: (param: DrinkType[]) => void;
};

const DrinksContext = createContext({} as DrinksContextType);

export default DrinksContext;
