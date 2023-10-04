/* eslint-disable react/jsx-max-depth */
import { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MealsContext from '../../context/MealContext/MealsContext';
import DrinksContext from '../../context/DrinkContext/DrinksContext';
import Category from '../../components/Category';
import style from './style.module.css';
import favoriteHeart from '../../assets/Icons/empty-heart.svg';
import Header from '../../components/Header';

export default function Recipes() {
  const { drinksData } = useContext(DrinksContext);
  const { mealsData } = useContext(MealsContext);

  const location = useLocation().pathname;

  return (
    <main className={ style.recipePageMain }>
      <Header />
      <Category />
      { location === '/meals' ? (
        mealsData?.slice(0, 12).map((meal, index) => (
          <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
            <div
              data-testid={ `${index}-recipe-card` }
              className={ index === 11 ? style.recipePageCardLast : style.recipePageCard }
            >
              <img
                className={ style.recipePageFoodImg }
                width="150"
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <div className={ style.recipePageCardText }>
                <div className={ style.recipePageFoodNfav }>
                  <div className={ style.recipePageTitleAndCategory }>
                    <div className={ style.recipePageFavDiv }>
                      <p
                        className={ style.recipePageFoodName }
                        data-testid={ `${index}-card-name` }
                      >
                        { `${meal.strMeal.substring(0, 15)}...` }
                      </p>
                      <button className={ style.recipePageFavBtn }>
                        <img
                          className={ style.recipePageFavBtnImg }
                          src={ favoriteHeart }
                          alt="favoritar"
                        />
                      </button>
                    </div>
                    <p className={ style.recipePageCardCategory }>
                      { `Categoria: ${meal.strCategory}` }
                    </p>
                  </div>
                </div>
                <button className={ style.recipePageDetailBtn }>Detalhes</button>
              </div>
            </div>
          </Link>
        ))
      ) : (
        drinksData?.slice(0, 12).map((drink, index) => (
          <Link to={ `/drinks/${drink.idDrink}` } key={ drink.idDrink }>
            <div
              className={ index === 11 ? style.recipePageCardLastDrink
                : style.recipePageCardDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className={ style.recipePageDrinkImg }
                width="150"
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <div className={ style.recipePageCardDrinkText }>
                <div className={ style.recipePageDrinkNfav }>
                  <p
                    className={ style.recipePageDrinkName }
                    data-testid={ `${index}-card-name` }
                  >
                    { `${drink.strDrink.substring(0, 15)}...` }
                  </p>
                  <button className={ style.recipePageFavDrinkBtn }>
                    <img
                      className={ style.recipePageFavDrinkImg }
                      src={ favoriteHeart }
                      alt="favoritar"
                    />
                  </button>
                </div>
                <p className={ style.recipePageDrinkAlcoholic }>
                  { `Categoria: ${drink.strAlcoholic}` }
                </p>
                <button className={ style.recipePageDetailBtn }>Detalhes</button>
              </div>
            </div>
          </Link>
        ))
      ) }
    </main>
  );
}
