import { useEffect, useState } from 'react';
import { DrinkType, MealType } from '../../type';
import style from './style.module.css';

type MealCardProps = {
  recipeData: MealType | DrinkType;
};

export default function MealCard({ recipeData }: MealCardProps) {
  const [drinksData, setDrinksData] = useState<DrinkType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();
      setDrinksData(drinks);
    };
    getData();
  }, []);

  return (
    <>
      <section className={ style.mealCardMainSection }>
        <img
          className={ style.mealCardThumbImg }
          data-testid="recipe-photo"
          src={ recipeData.strMealThumb }
          alt="imagem da receita"
        />
        <div className={ style.mealCardGradient } />
        <div className={ style.mealCardTitleAndCategory }>
          <h2 className={ style.mealCardTitle } data-testid="recipe-title">
            { recipeData.strMeal }
          </h2>
          <h3 className={ style.mealCardCategory } data-testid="recipe-category">
            { recipeData.strCategory }
          </h3>
        </div>
        <div className={ style.mealCardIngredients }>
          <ul className={ style.mealCardUl }>
            <h2 className={ style.mealCardIngredientsTitle }>
              Ingredientes
            </h2>
            { Object.keys(recipeData)
              .filter((key) => key.includes('strIngredient'))
              .map((ingredient: string, index: number) => (
                recipeData[ingredient] !== null && recipeData[ingredient] !== ''
                && (
                  <li className={ style.mealCardLi } key={ index }>
                    <p
                      className={ style.mealCardIngredient }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { `${recipeData[ingredient]} -` }
                    </p>
                    <p
                      className={ style.mealCardMeasure }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { ` ${recipeData[`strMeasure${Number(index) + 1}`]}` }
                    </p>
                  </li>
                )
              )) }
          </ul>
        </div>
        <h2 className={ style.mealCardInstructionsTitle }>Modo de preparo</h2>
        <p className={ style.mealCardInstructions } data-testid="instructions">
          { recipeData.strInstructions }
        </p>
        <iframe
          className={ style.mealCardVideo }
          data-testid="video"
          width="560"
          height="315"
          src={ `${recipeData.strYoutube}`.replace('watch?v=', '/embed/') }
          title="YouTube video player"
          allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share"
          allowFullScreen
        />
      </section>
      { drinksData.length && (
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
                  src={ drinksData[0].strDrinkThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="0-recommendation-title"
                >
                  { drinksData[0].strDrink }
                </h5>
              </div>
              <div data-testid="1-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ drinksData[1].strDrinkThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="1-recommendation-title"
                >
                  { drinksData[1].strDrink }
                </h5>
              </div>
            </div>
            <div className={ `carousel-item ${style.suaClasseAdicional}` }>
              <div data-testid="2-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ drinksData[2].strDrinkThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="2-recommendation-title"
                >
                  { drinksData[2].strDrink }
                </h5>
              </div>
              <div data-testid="3-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ drinksData[3].strDrinkThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="3-recommendation-title"
                >
                  { drinksData[3].strDrink }
                </h5>
              </div>
            </div>
            <div className={ `carousel-item ${style.suaClasseAdicional}` }>
              <div data-testid="4-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ drinksData[4].strDrinkThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="4-recommendation-title"
                >
                  { drinksData[4].strDrink }
                </h5>
              </div>
              <div data-testid="5-recommendation-card">
                <img
                  className={ style.carouselImg }
                  src={ drinksData[5].strDrinkThumb }
                  alt=""
                />
                <h5
                  className={ style.carouselFoodTitle }
                  data-testid="5-recommendation-title"
                >
                  { drinksData[5].strDrink }
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
