import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './style.css';
import { FetchByIdResponse } from '../../type';

export default function RecipesInProgress() {
  const [apiResponse, setApiResponse] = useState<FetchByIdResponse>();
  const [ingredientKey, setIngredientKey] = useState<string[]>([]);

  const initialCheckBoxInputs: any = {};
  for (let i = 1; i <= 20; i++) {
    initialCheckBoxInputs[`strIngredient${i}`] = false;
  }
  const [checkBoxInputs, setCheckboxInputs] = useState<{ [key: string]: boolean }>(
    initialCheckBoxInputs,
  );

  const location = useLocation().pathname;
  const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
  const id = 52977;

  useEffect(() => {
    const fetchById = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setApiResponse(jsonData.meals[0]);
      const ingredientsKeys = Object.keys(jsonData.meals[0])
        .filter((key) => key.includes('strIngredient'));

      setIngredientKey(ingredientsKeys);
    };
    fetchById();
  }, [location, id, url]);

  const handleList = (ingredient: string) => {
    setCheckboxInputs((prevState) => {
      const updatedCheckboxInputs = { ...prevState };
      updatedCheckboxInputs[ingredient] = !prevState[ingredient];
      return updatedCheckboxInputs;
    });
  };

  return (
    <div>
      { apiResponse ? (
        <section>
          <img
            width="200"
            data-testid="recipe-photo"
            src={ (apiResponse.strMealThumb as string) }
            alt={ (apiResponse.strMeal as string) }
          />
          <h1 data-testid="recipe-title">{ apiResponse.strMeal }</h1>
          { ingredientKey.map((ingredient, index) => (
            apiResponse[ingredient] ? (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  checked={ checkBoxInputs[ingredient] }
                  onClick={ () => handleList(ingredient) }
                  type="checkbox"
                />
                <p
                  className={ checkBoxInputs[ingredient] ? 'decoration' : 'noDecoration' }
                >
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
