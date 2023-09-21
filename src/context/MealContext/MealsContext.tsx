import { createContext } from 'react';
import { MealType } from '../../type';

export type MealsContextType = {
  mealsData: MealType[];
  updateMeals: (param: MealType[]) => void;
};

const MealsContext = createContext({} as MealsContextType);

export default MealsContext;
