import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from './style.module.css';
import { DrinkType, FavoriteRecipeType, MealType } from '../../type';
import heart_checked from '../../images/blackHeartIcon.svg';
import heart_unchecked from '../../images/whiteHeartIcon.svg';

export default function RecipesInProgress() {
  const [recipeData, setRecipeData] = useState<MealType | DrinkType>();
  const [typeRecipe, setTypeRecipe] = useState<string>('');
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [shareMessage, setShareMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const routeType = location.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const fetchById = async () => {
      const URL_API = location.includes('meals') ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL_API);
      const jsonData = await response.json();
      setRecipeData(jsonData[routeType][0]);
      setIngredients(Object.entries(jsonData[routeType][0])
        .filter((content: [string, unknown]) => content[0]
          .includes('strIngredient') && content[1]).flat()
        .filter((ingredient: any) => !(
          ingredient.includes('strIngredient'))) as string[]);
      if (routeType === 'meals') setTypeRecipe('Meal');
      else setTypeRecipe('Drink');
    };
    const verifyLocalStorage = () => {
      if (!localStorage.getItem('inProgressRecipes')) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ drinks: {}, meals: {} }),
        );
      } else {
        const storeData = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
        if (storeData[routeType][id]) {
          setUsedIngredients(storeData[routeType][id]);
        }
      }
    };
    const isFavoriteRecipe = () => {
      if (localStorage.getItem('favoriteRecipes')) {
        setIsFavorite(JSON.parse(localStorage.getItem('favoriteRecipes') as string)
          .some((recipe: FavoriteRecipeType) => recipe.id === id));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
    };
    fetchById();
    verifyLocalStorage();
    isFavoriteRecipe();
  }, [id]);

  const handleChange = ({
    target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const storeData = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
    if (!usedIngredients.includes(value)) {
      const newUsedIngredients = [...usedIngredients, value];
      setUsedIngredients(newUsedIngredients);
      storeData[routeType] = { [id]: newUsedIngredients };
      localStorage.setItem('inProgressRecipes', JSON.stringify(storeData));
      if (newUsedIngredients.length === ingredients.length) setIsDisable(false);
    } else {
      const removedIngredient = usedIngredients
        .filter((ingredient) => ingredient !== value);
      setUsedIngredients(removedIngredient);
      storeData[routeType] = { [id]: removedIngredient };
      localStorage.setItem('inProgressRecipes', JSON.stringify(storeData));
    }
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(window.location.href.replace('/in-progress', ''));
    setShareMessage(true);
  };

  const addFavoriteRecipe = (storageData: FavoriteRecipeType[]) => {
    setIsFavorite(true);
    if (recipeData !== undefined) {
      const updateFavorites = [...storageData, {
        id: routeType === 'meals' ? recipeData.idMeal : recipeData.idDrink,
        type: routeType.replace('s', ''),
        nationality: routeType === 'meals' ? recipeData.strArea : '',
        category: recipeData.strCategory,
        alcoholicOrNot: routeType === 'meals' ? '' : recipeData.strAlcoholic,
        name: routeType === 'meals' ? recipeData.strMeal : recipeData.strDrink,
        image: routeType === 'meals' ? recipeData.strMealThumb : recipeData.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorites));
    }
  };

  const removeFavoriteRecipe = (storageData: FavoriteRecipeType[]) => {
    const removedFavoriteItem = storageData.filter((recipe) => recipe.id !== id);
    setIsFavorite(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedFavoriteItem));
  };

  const favoriteRecipe = () => {
    const storageData = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    if (isFavorite) removeFavoriteRecipe(storageData);
    else addFavoriteRecipe(storageData);
  };

  const finishRecipe = () => {
    const recipe = {
      id: routeType === 'meals' ? recipeData.idMeal : recipeData.idDrink,
      type: routeType.replace('s', ''),
      nationality: routeType === 'meals' ? recipeData.strArea : '',
      category: recipeData.strCategory,
      alcoholicOrNot: routeType === 'meals' ? '' : recipeData.strAlcoholic,
      name: routeType === 'meals' ? recipeData.strMeal : recipeData.strDrink,
      image: routeType === 'meals' ? recipeData.strMealThumb : recipeData.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: routeType === 'meals' ? recipeData.strTags.split(',') : [],
    };
    if (localStorage.getItem('doneRecipes')) {
      const storeData = JSON.parse(localStorage.getItem('doneRecipes') as string);
      localStorage.setItem('doneRecipes', JSON.stringify([...storeData, recipe]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
    }
  };

  return (
    <div>
      { recipeData && (
        <section className="recipesIngProgressSection">
          <button
            data-testid="share-btn"
            onClick={ copyText }
          >
            Compartilhar
          </button>
          <button
            type="button"
            onClick={ favoriteRecipe }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? heart_checked : heart_unchecked }
              alt="imagem de coração"
            />
          </button>
          <button
            data-testid="finish-recipe-btn"
            disabled={ isDisable }
            onClick={ () => {
              finishRecipe();
              navigate('/done-recipes');
            } }
          >
            Finalizar
          </button>

          {shareMessage && <h4>Link copied!</h4>}

          <img
            data-testid="recipe-photo"
            src={ recipeData[`str${typeRecipe}Thumb`] }
            alt={ recipeData.strMeal }
          />

          <h2 data-testid="recipe-title">{ recipeData[`str${typeRecipe}`] }</h2>

          <p data-testid="recipe-category">{ recipeData.strCategory }</p>

          {ingredients.map((ingredient, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ index }
              className={
                usedIngredients.includes(ingredient)
                  ? (style.ingredientUsed)
                  : (style.ingredientUnused)
              }
            >
              <input
                type="checkbox"
                value={ ingredient }
                onChange={ handleChange }
                checked={ usedIngredients.includes(ingredient) }
              />
              {ingredient}
            </label>
          ))}

          <p data-testid="instructions">{ recipeData.strInstructions }</p>

        </section>
      )}
    </div>
  );
}
