import { createContext } from 'react';
import { MealType } from '../../type';

export type MealsContextType = {
  apiResponseMeals: MealType[];
  setApiMeals: (param: MealType[]) => void;
};

const MealsContext = createContext({} as MealsContextType);

export default MealsContext;
