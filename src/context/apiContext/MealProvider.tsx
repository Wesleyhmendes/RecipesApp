import { useState } from 'react';
import { MealType } from '../../type';
import MealsContext from './MealContext';

type MealsProviderProps = {
  children: React.ReactNode;
};

export default function MealsProvider({ children }: MealsProviderProps) {
  const [apiResponseMeals, setApiResponseMeals] = useState<MealType[]>([]);

  const setApiMeals = (param: MealType[]) => {
    setApiResponseMeals(param);
  };

  const value = {
    apiResponseMeals,
    setApiMeals,
  };

  return (
    <MealsContext.Provider value={ value }>
      {children}
    </MealsContext.Provider>
  );
}
