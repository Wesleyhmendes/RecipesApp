import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const location = useLocation().pathname;
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const recipeType = location.split('/');
      let URL_API = '';
      if (recipeType[1] === 'meals') {
        URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      if (recipeType[1] === 'drinks') {
        URL_API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      const response = await fetch(URL_API);
      const { meals } = await response.json();
      console.log(meals[0]);
      setRecipeData(meals[0]);
    };
    getData();
  }, [id, location]);

  return (
    <>Recipe Details</>
  );
}
