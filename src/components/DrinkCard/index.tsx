import { useEffect, useState } from 'react';
import { DrinkType, MealType } from '../../type';
import style from './style.module.css';

type DrinkCardProps = {
  recipeData: DrinkType | MealType;
};

export default function DrinkCard({ recipeData }: DrinkCardProps) {
  const [mealData, setMealData] = useState<MealType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      setMealData(meals);
    };
    getData();
  }, []);

  return (
    <>
      <section className={ style.drinkCardMainSection }>
        <img
          className={ style.drinkCardThumbImg }
          data-testid="recipe-photo"
          src={ recipeData.strDrinkThumb }
          alt="imagem da receita"
        />
        <div className={ style.drinkCardGradient } />
        <div className={ style.drinkCardTitleAndCategory }>
          <h2
            className={ recipeData.strDrink.length > 15
              ? style.drinkCardBigTitle : style.drinkCardTitle }
            data-testid="recipe-title"
          >
            { recipeData.strDrink }
          </h2>
          <h3
            className={ style.drinkCardCategory }
            data-testid="recipe-category"
          >
            { recipeData.strAlcoholic }
          </h3>
        </div>
        <div className={ style.drinkCardIngredients }>
          <ul className={ style.drinkCardUl }>
            { Object.keys(recipeData)
              .filter((key) => key.includes('strIngredient'))
              .map((ingredient: string, index: number) => (
                recipeData[ingredient] !== null
                && recipeData[ingredient] !== ''
                && (
                  <li className={ style.drinkCardLi } key={ index }>
                    <p
                      className={ style.drinkCardIngredient }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { `${recipeData[ingredient]}` }
                    </p>
                    <p
                      className={ style.drinkCardMeasure }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { `${recipeData[`strMeasure${Number(index) + 1}`]}` }
                    </p>
                  </li>
                )
              )) }
          </ul>
        </div>
        <h2 className={ style.drinkCardInstructionsTitle }>Modo de preparo</h2>
        <p className={ style.drinkCardInstructions } data-testid="instructions">
          { recipeData.strInstructions }
        </p>
      </section>
      { mealData.length! && (
        <div
          id="carouselExampleAutoplaying"
          className={ `carousel slide ${style.carouselMainDiv}` }
          data-bs-ride="carousel"
        >
          <div className={ `carousel-inner ${style.carouselImgMainDiv}` }>
            <div className={ `carousel-item active ${style.carousel2ImgMainDiv}` }>
              <div data-testid="0-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ mealData[0].strMealThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="0-recommendation-title"
                >
                  { mealData[0].strMeal }
                </h5>
              </div>
              <div data-testid="1-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ mealData[1].strMealThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="1-recommendation-title"
                >
                  { mealData[1].strMeal }
                </h5>
              </div>
            </div>
            <div className="carousel-item">
              <div data-testid="2-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ mealData[2].strMealThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="2-recommendation-title"
                >
                  { mealData[2].strMeal }
                </h5>
              </div>
              <div data-testid="3-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ mealData[3].strMealThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="3-recommendation-title"
                >
                  { mealData[3].strMeal }
                </h5>
              </div>
            </div>
            <div className="carousel-item">
              <div data-testid="4-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ mealData[4].strMealThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="4-recommendation-title"
                >
                  { mealData[4].strMeal }
                </h5>
              </div>
              <div data-testid="5-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ mealData[5].strMealThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="5-recommendation-title"
                >
                  { mealData[5].strMeal }
                </h5>
              </div>
            </div>
          </div>
          <button
            className={ `carousel-control-prev ${style.carouselPrevBtn}` }
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className={ `carousel-control-prev-icon ${style.carouselPrevSpan1}` }
              aria-hidden="true"
            />
            <span
              className={ `visually-hidden ${style.carouselPrevSpan2}` }
            >
              Previous
            </span>
          </button>
          <button
            className={ `carousel-control-next ${style.carouselNextBtn}` }
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className={ `carousel-control-next-icon ${style.carouselPrevSpan1}` }
              aria-hidden="true"
            />
            <span
              className={ `visually-hidden ${style.carouselPrevSpan2}` }
            >
              Next
            </span>
          </button>
        </div>
      ) }
    </>
  );
}
