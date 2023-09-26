import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../../type';

type FavoriteRecipesStorage = {
  id: number,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string,
};

export default function FavoriteRecipes() {
  const [shareMessage, setShareMessage] = useState<boolean>(false);
  const [doneRecipes, setDoneRecipes] = useState<FavoriteRecipesStorage[]>([{
    id: 46521,
    type: 'meal',
    nationality: 'british',
    category: 'dessert',
    alcoholicOrNot: 'alcoholic',
    name: 'cake',
    image: 'https://www.receitasnestle.com.br/sites/default/files/srh_recipes/9f66a2bff2f5962577879b44aa153cc2.jpg',
    doneDate: '28/05/2009',
    tags: '',
  }]);

  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    );
    if (getLocalStorageData) {
      setDoneRecipes(getLocalStorageData);
    }
  }, []);

  const copyText = async () => {
    setShareMessage(true);
    await navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setShareMessage(false);
    }, 1500);
  };

  const handleRemoveFavorites = (recipeId: number) => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    );
    const updateFavorites = getLocalStorageData
      .filter((recipe: FavoriteRecipesStorage) => recipe.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorites));
  };

  const handleCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = event.currentTarget;
    const localStorageData = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    );
    const filterByCategory = localStorageData
      .filter((recipe: FavoriteRecipeType) => recipe.type === value);
    setDoneRecipes(filterByCategory);
  };

  const clearCategory = () => {
    const localStorageData = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    );
    setDoneRecipes(localStorageData);
  };

  return (
    <section>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      { doneRecipes
        && doneRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}/${recipe.id}` }>
              <img
                width="200"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.nationality} - ${recipe.category}` }
            </p>
            { recipe.alcoholicOrNot ? (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot }
              </p>
            ) : null }
            <button
              name="Meals"
              value="Meals"
              onClick={ (event) => handleCategory(event) }
            >
              Meals
            </button>
            <button
              name="Drinks"
              value="Drinks"
              onClick={ (event) => handleCategory(event) }
            >
              Drinks
            </button>
            <button
              onClick={ clearCategory }
            >
              All
            </button>
            <button onClick={ copyText } data-testid={ `${index}-horizontal-share-btn` }>
              <img src="src/images/shareIcon.svg" alt="compartilhar" />
            </button>
            <button
              onClick={ () => handleRemoveFavorites(recipe.id) }
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              <img src="src/images/blackHeartIcon.svg" alt="favoritar" />
            </button>
            { shareMessage && (
              <h4>Link copied!</h4>
            ) }
          </div>
        )) }
    </section>
  );
}

// Exemplo do Local Storage

// [{
//   id: 46521,
//   type: meal,
//   nationality: british,
//   category: dessert,
//   alcoholicOrNot: '',
//   name: cake,
//   image: 'https://www.receitasnestle.com.br/sites/default/files/srh_recipes/9f66a2bff2f5962577879b44aa153cc2.jpg',
//   doneDate: '28/05/2009',
//   tags: '',
// }]
