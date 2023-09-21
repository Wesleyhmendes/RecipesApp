import { useState } from 'react';
import { MealType } from '../../type';
import MealsContext from './MealsContext';

type MealsProviderProps = {
  children: React.ReactNode;
};

export default function MealsProvider({ children }: MealsProviderProps) {
  const [mealsData, setMealsData] = useState<MealType[]>([]);

  const updateMeals = (param: MealType[]) => {
    setMealsData(param);
  };

  const value = {
    mealsData,
    updateMeals,
  };

  return (
    <MealsContext.Provider value={ value }>
      {children}
    </MealsContext.Provider>
  );
}
