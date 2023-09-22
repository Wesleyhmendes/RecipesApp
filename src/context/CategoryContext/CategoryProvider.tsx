import { useEffect, useState } from 'react';
import { FetchType, MealType } from '../../type';

type CategoryProviderProps = {
  children: React.ReactNode;
};

export default function CategoryProvider({ children }: CategoryProviderProps) {
  const [categoryData, setCategoryData] = useState<MealType[]>([]);

  const fetchCategoryData = async ({ url }: string) => {
    let url = '';
    switch () {
      case '':
        url = ``;
        break;
      default:
        break;
    }

    const response = await fetch(url);
    const jsonData = await response.json();
    setCategoryData(jsonData.meals);
  };

  const value = {
    categoryData,
    fetchCategoryData,
  };

  return (
    <CategoryContext.Provider value={ value }>
      { children }
    </CategoryContext.Provider>
  );
}
