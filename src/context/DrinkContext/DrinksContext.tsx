import { createContext } from 'react';
import { DrinkType } from '../../type';

export type DrinkContextType = {
  drinksData: DrinkType[];
  updateDrinks: (drinks: DrinkType[]) => void;
};

const DrinksContext = createContext({} as DrinkContextType);

export default DrinksContext;
