import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DoneRecipeType, DrinkType, FavoriteRecipeType, MealType } from '../../type';
import MealCard from '../../components/MealCard';
import DrinkCard from '../../components/DrinkCard';
import style from './style.module.css';
import heart_unchecked from '../../assets/Icons/white-empty-heat.svg';
import heart_checked from '../../assets/Icons/white-full-heart.svg';
import shareBtn from '../../assets/Icons/white-share-btn.svg';
import goBackButton from '../../assets/Icons/white-go-back-btn.svg';

export default function RecipeDetails() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<MealType | DrinkType | null>(null);
  const [showButtonStart, setShowButtonStart] = useState<boolean>();
  const [buttonType, setButtonType] = useState<string>('');
  const [shareMessage, setShareMessage] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const type = location.split('/')[1];

  useEffect(() => {
    const getData = async () => {
      const URL_API = type === 'meals' ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL_API);
      const data = await response.json();
      setRecipeData(data[type][0]);
    };

    const verifyLocalStorage = () => {
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('doneRecipes')) {
        localStorage.setItem('doneRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('inProgressRecipes')) {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
      }
    };

    const addTypeButton = () => {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
      if (id && Object.keys(inProgress[type]).includes(id)) setButtonType('continue');
      else {
        setButtonType('start');
        setShowButtonStart(!JSON.parse(localStorage.getItem('doneRecipes') as string)
          .some((receita: DoneRecipeType) => receita.id === id));
      }
    };

    const isFavoriteRecipe = () => {
      setIsFavorite(JSON.parse(localStorage.getItem('favoriteRecipes') as string)
        .some((recipe: FavoriteRecipeType) => recipe.id === id));
    };
    getData();
    verifyLocalStorage();
    addTypeButton();
    isFavoriteRecipe();
  }, [id]);

  const copyText = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShareMessage(true);
  };

  const addFavoriteRecipe = (storageData: FavoriteRecipeType[]) => {
    setIsFavorite(true);
    if (recipeData !== null) {
      const updateFavorites = [...storageData, {
        id: type === 'meals' ? recipeData.idMeal : recipeData.idDrink,
        type: type.replace('s', ''),
        nationality: type === 'meals' ? recipeData.strArea : '',
        category: recipeData.strCategory,
        alcoholicOrNot: type === 'meals' ? '' : recipeData.strAlcoholic,
        name: type === 'meals' ? recipeData.strMeal : recipeData.strDrink,
        image: type === 'meals' ? recipeData.strMealThumb : recipeData.strDrinkThumb,
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className={ style.detailsPageMain }>
      <button onClick={ handleGoBack } className={ style.detailsPageGoBackBtn }>
        <img
          className={ style.detailsPageGoBackImg }
          src={ goBackButton }
          alt="voltar"
        />
      </button>
      <button
        className={ style.detailsPageShareBtn }
        type="button"
        data-testid="share-btn"
        onClick={ copyText }
      >
        <img src={ shareBtn } alt="ícone do botão compartilhar" />
      </button>
      <button
        className={ style.detailsPageFavBtn }
        type="button"
        onClick={ favoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? heart_checked : heart_unchecked }
          alt="imagem de coração"
        />
      </button>
      { shareMessage && (
        <h4>Link copied!</h4>
      ) }
      { (recipeData !== null) && (
        type === 'meals' ? (
          recipeData !== null && (
            <MealCard recipeData={ recipeData } />
          )
        ) : (
          recipeData !== null && (
            <DrinkCard recipeData={ recipeData } />
          )
        )
      ) }
      { buttonType === 'continue' ? (
        <div className={ style.detailsPageStartButton }>
          <button
            className={ style.btnStartRecipe }
            data-testid="start-recipe-btn"
            onClick={
              () => navigate(`/${type}/${id}/in-progress`)
            }
          >
            Continue Recipe
          </button>
        </div>
      ) : (
        showButtonStart && (
          <div className={ style.detailsPageContinueButton }>
            <button
              className={ style.btnStartRecipe }
              data-testid="start-recipe-btn"
              type="button"
              onClick={
                () => navigate(`/${type}/${id}/in-progress`)
              }
            >
              Start Recipe
            </button>
          </div>
        )
      ) }
    </main>
  );
}
