import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipeType } from '../../type';
import shareBtn from '../../assets/Icons/share-icon.png';
import style from './style.module.css';
import HeaderWithImage from '../../components/HeaderWithImage';

export default function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState<DoneRecipeType[]>([]);
  const [filter, setFilter] = useState('all');
  const [shareMessage, setShareMessage] = useState<boolean>(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') ?? '[]');
    setRecipesDone(doneRecipes);
  }, []);

  const filteredRecipes = filter === 'all'
    ? recipesDone
    : recipesDone.filter((recipe) => recipe.type === filter);

  const copyText = async (recipe: DoneRecipeType) => {
    const recipeUrl = `${window.location.origin}/${recipe.type}s/${recipe.id}`;
    setShareMessage(true);

    try {
      await navigator.clipboard.writeText(recipeUrl);
      setShareMessage(true);
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  return (
    <main className={ style.donePageMainSection }>
      <HeaderWithImage />
      <div className={ style.donePageFiltersDiv }>
        <div
          className={ `${filter === 'all' ? style
            .donePageFiltersInsideDivTrue : style.donePageFiltersInsideDivFalse}` }
        >
          <button
            className={ style.donePageFilterButton }
            onClick={ () => setFilter('all') }
            data-testid="filter-by-all-btn"
          >
            <p
              className={ `${filter === 'all' ? style
                .donePageFilterTextTrue : style.donePageFilterTextFalse}` }
            >
              All
            </p>

          </button>
        </div>
        <div
          className={ `${filter === 'meal' ? style
            .donePageFiltersInsideDivTrue : style.donePageFiltersInsideDivFalse}` }
        >
          <button
            className={ style.donePageFilterButton }
            onClick={ () => setFilter('meal') }
            data-testid="filter-by-meal-btn"
          >
            <p
              className={ `${filter === 'meal' ? style
                .donePageFilterTextTrue : style.donePageFilterTextFalse}` }
            >
              Meals
            </p>

          </button>
        </div>
        <div
          className={ `${filter === 'drink' ? style
            .donePageFiltersInsideDivTrue : style.donePageFiltersInsideDivFalse}` }
        >
          <button
            className={ style.donePageFilterButton }
            onClick={ () => setFilter('drink') }
            data-testid="filter-by-drink-btn"
          >
            <p
              className={ `${filter === 'drink' ? style
                .donePageFilterTextTrue : style.donePageFilterTextFalse}` }
            >
              Drinks
            </p>

          </button>
        </div>
      </div>
      <section className={ style.donePageRecipeCardsection }>
        { filteredRecipes.map((recipe, index) => (
          <div className={ style.donePageRecipeCard } key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className={ style.donePageRecipeCardImg }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                width="200px"
              />
            </Link>
            <div className={ style.donePageRecipeCardText }>
              <div className={ style.donePageRecipeCardNameAndShare }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p
                    className={ style.donePageRecipeCardName }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { recipe.name }
                  </p>
                </Link>
                <button
                  className={ style.donePageRecipeCardShareBtn }
                  onClick={ () => copyText(recipe) }
                >
                  <img
                    className={ style.donePageRecipeCardShareImg }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareBtn }
                    alt="ícone do botão compartilhar"
                  />
                </button>
              </div>
              <div className={ style.donePageRecipeCardDescDiv }>
                <p
                  className={ style.donePageRecipeCardCategory }
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : recipe.alcoholicOrNot }
                </p>
                <p
                  className={ style.donePageRecipeCardDate }
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { recipe.doneDate }
                </p>
                <div>
                  { recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      className={ style.donePageRecipeCardTag }
                      key={ tagIndex }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </span>
                  )) }
                </div>
              </div>
              { shareMessage && <h4>Link copied!</h4> }
            </div>
          </div>
        )) }
      </section>
    </main>
  );
}
