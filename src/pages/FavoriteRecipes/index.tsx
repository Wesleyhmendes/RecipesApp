/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipesStorage } from '../../type';
import HeaderWithImage from '../../components/HeaderWithImage';
import shareIcon from '../../assets/Icons/share-icon.svg';
import style from './style.module.css';

export default function FavoriteRecipes() {
  const [shareMessage, setShareMessage] = useState<boolean>(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipesStorage[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem('favoriteRecipes') as string,
    );
    if (getLocalStorageData) {
      setFavoriteRecipes(getLocalStorageData);
    }
  }, []);

  const filteredRecipes = filter === 'all'
    ? favoriteRecipes
    : favoriteRecipes.filter((recipe) => recipe.type === filter);

  const copyText = async (recipe: FavoriteRecipesStorage) => {
    const recipeUrl = `${window.location.origin}/${recipe.type}s/${recipe.id}`;
    await navigator.clipboard.writeText(recipeUrl);
    setShareMessage(true);
  };

  const getLocalStorageData = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  );

  const handleRemoveFavorites = (recipeId: number) => {
    const updateFavorites = getLocalStorageData
      .filter((recipe: FavoriteRecipesStorage) => recipe.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorites));
    setFavoriteRecipes(updateFavorites);
  };

  return (
    <section>
      <HeaderWithImage />
      <div className={ style.favoritePageFiltersDiv }>
        <div
          className={ `${filter === 'all' ? style
            .favoritePageFiltersInsideDivTrue : style
            .favoritePageFiltersInsideDivFalse}` }
        >
          <button
            className={ style.favoritePageFilterButton }
            onClick={ () => setFilter('all') }
            data-testid="filter-by-all-btn"
          >
            <p
              className={ `${filter === 'all' ? style
                .favoritePageFilterTextTrue : style.favoritePageFilterTextFalse}` }
            >
              All
            </p>
          </button>
        </div>
        <div
          className={ `${filter === 'meal' ? style
            .favoritePageFiltersInsideDivTrue : style
            .favoritePageFiltersInsideDivFalse}` }
        >
          <button
            className={ style.favoritePageFilterButton }
            onClick={ () => setFilter('meal') }
            data-testid="filter-by-meal-btn"
          >
            <p
              className={ `${filter === 'meal' ? style
                .favoritePageFilterTextTrue : style.favoritePageFilterTextFalse}` }
            >
              Meals
            </p>
          </button>
        </div>
        <div
          className={ `${filter === 'drink' ? style
            .favoritePageFiltersInsideDivTrue : style
            .favoritePageFiltersInsideDivFalse}` }
        >
          <button
            className={ style.favoritePageFilterButton }
            onClick={ () => setFilter('drink') }
            data-testid="filter-by-drink-btn"
          >
            <p
              className={ `${filter === 'drink' ? style
                .favoritePageFilterTextTrue : style.favoritePageFilterTextFalse}` }
            >
              Drinks
            </p>
          </button>
        </div>
      </div>
      { filteredRecipes
        && filteredRecipes.map((recipe, index) => (
          <div className={ style.favoritePageRecipeCard } key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className={ style.favoritePageRecipeCardImg }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                width="200"
              />
            </Link>
            <div className={ style.favoritePageRecipeCardText }>
              <div className={ style.favoritePageRecipeCardNameAndShare }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p
                    className={ style.favoritePageRecipeCardName }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { recipe.name }
                  </p>
                </Link>
                <button
                  className={ style.favoritePageRecipeCardShareBtn }
                  onClick={ () => copyText(recipe) }
                >
                  <img
                    className={ style.favoritePageRecipeCardShareImg }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="compartilhar"
                  />
                </button>
                <button
                  className={ style.favoritePageFavoriteBtn }
                  onClick={ () => handleRemoveFavorites(recipe.id) }
                >
                  <img
                    className={ style.favoritePageFavoriteImg }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src="src/images/blackHeartIcon.svg"
                    alt="favoritar"
                  />
                </button>
              </div>
              <p
                className={ style.favoritePageCategory }
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.category }
              </p>
              <p
                className={ style.favoritePageNationality }
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
              { recipe.alcoholicOrNot ? (
                <p
                  className={ style.favoritePageAlcoholicOrNot }
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot }
                </p>
              ) : null }
              { shareMessage && (
                <h4>Link copied!</h4>
              ) }
            </div>
          </div>
        )) }
    </section>
  );
}
