import React, { useEffect, useState } from 'react';
import { json, useLocation, useParams } from 'react-router-dom';
import './style.css';

export default function RecipesInProgress() {
  const [apiResponse, setApiResponse] = useState();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [checkedMap, setCheckedMap] = useState<{ [key: number]: boolean }>({});

  // const { id } = useParams();
  // const location = useLocation().pathname;

  // let url = '';

  // if (location.includes('meals')) {
  //   url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  // } else {
  //   url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  // }

  const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
  const id = 52977;

  useEffect(() => {
    const fetchById = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();

      setApiResponse(jsonData.meals[0]);

      const ingredientsKeys = Object.keys(jsonData.meals[0])
        .filter((key) => key.includes('strIngredient'));

      setIngredients(ingredientsKeys);

      let localStorageData = JSON.parse(localStorage
        .getItem('inProgressRecipes') || '{}');

      if (!localStorageData || localStorageData === '{}') {
        localStorageData = {
          drinks: {},
          meals: {
            id: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageData));
      }

      const checkedIngredients = localStorageData[id] || {};

      const initialCheckedMap = ingredientsKeys.reduce((map, ingredient, index) => {
        map[index] = checkedIngredients.includes(apiResponse[ingredient]);
        return map;
      }, {});

      setCheckedMap(initialCheckedMap);
    };
    fetchById();
  }, []);

  const handleList = (index: number) => {
    const newCheckedMap = {
      ...checkedMap,
      [index]: !checkedMap[index],
    };
    setCheckedMap(newCheckedMap);

    const selectedIngredients = ingredients
      .filter((ingredient, idx) => newCheckedMap[idx])
      .map((ingredient) => apiResponse[ingredient]);

    const localStorageData = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');
    const recipeData = localStorageData[id] || {};
    recipeData[id] = selectedIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...localStorageData,
      [id]: recipeData,
    }));
  };

  return (
    <div>
      { apiResponse ? (
        <section className="recipesIngProgressSection">
          <img
            width="200"
            data-testid="recipe-photo"
            src={ apiResponse.strMealThumb }
            alt={ apiResponse.strMeal }
          />
          <h1 data-testid="recipe-title">{ apiResponse.strMeal }</h1>
          { ingredients.map((ingredient, index) => (
            apiResponse[ingredient] ? (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  checked={ checkedMap[index] }
                  onClick={ () => handleList(index) }
                  type="checkbox"
                />
                <p className={ checkedMap[index] ? 'decoration' : 'noDecoration' }>
                  { apiResponse[ingredient] }
                </p>
              </label>
            ) : null
          )) }
          <br />
          <p data-testid="recipe-category">{ apiResponse.strCategory }</p>
          <p data-testid="instructions">{ apiResponse.strInstructions }</p>
          <button data-testid="share-btn">Compartilhar</button>
          <button data-testid="favorite-btn">Favoritar</button>
          <button data-testid="finish-recipe-btn">Finalizar</button>
        </section>
      ) : (
        <p>Carregando...</p>
      ) }
    </div>
  );
}
