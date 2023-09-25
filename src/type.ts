export type UserInfoType = {
  email: string;
  password: string;
};

export type FetchType = {
  radioSelected: 'ingredient' | 'name' | 'firstLetter' | string;
  search: string,
};

export type MealType = {
  strMealThumb: string;
  strMeal: string;
  strCategory: string
  [strIngredient: string]: string;
};

export type DrinkType = {
  strDrinkThumb: string;
  strDrink: string;
  strAlcoholic: string;
  [strIngredient: string]: string;
};

export type MealsResponse = {
  meals: MealType[];
};

export type DrinksResponse = {
  drinks: DrinkType[];
};


export type FetchByIdResponse = {
  dateModified: null
  idMeal: string | null,
  strArea: string | null,
  strCategory: string | null,
  strCreativeCommonsConfirmed: string | null,
  strDrinkAlternate: string | null,
  strImageSource: string | null,
  strIngredient1: string | null,
  strIngredient2: string | null,
  strIngredient3: string | null,
  strIngredient4: string | null,
  strIngredient5: string | null,
  strIngredient6: string | null,
  strIngredient7: string | null,
  strIngredient8: string | null,
  strIngredient9: string | null,
  strIngredient10: string | null,
  strIngredient11: string | null,
  strIngredient12: string | null,
  strIngredient13: string | null,
  strIngredient14: string | null,
  strIngredient15: string | null,
  strIngredient16: string | null,
  strIngredient17: string | null,
  strIngredient18: string | null,
  strIngredient19: string | null,
  strIngredient20: string | null,
  strInstructions: string | null,
  strMeal: string | null,
  strMealThumb: string | null,
  strMeasure2: string | null,
  strMeasure4: string | null,
  strMeasure5: string | null,
  strMeasure6: string | null,
  strMeasure7: string | null,
  strMeasure8: string | null,
  strMeasure9: string | null,
  strMeasure10: string | null,
  strMeasure11: string | null,
  strMeasure12: string | null,
  strMeasure13: string | null,
  strMeasure14: string | null,
  strMeasure15: string | null,
  strMeasure16: string | null,
  strMeasure17: string | null,
  strMeasure18: string | null,
  strMeasure19: string | null,
  strMeasure20: string | null,
  strSource: string | null,
  strTags: string | null,
  strYoutube: string | null,

export type InProgressRecipeType = {
  drinks: {
    [key: string]: string[];
  };
  meals: {
    [key: string]: string[];
  };
};

export type DoneRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string
};

export type FavoriteRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};
