export type UserInfoType = {
  email: string;
  password: string;
};

export type FetchType = {
  radioSelected: 'ingredient' | 'name' | 'firstLetter' | string;
  search: string,
};

export type MealType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: null | string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  dateModified: null | string;
};

export type MealsResponse = {
  meals: MealType[];
};

export type DrinkType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: null | string;
  strDrinkES: null | string;
  strDrinkDE: null | string;
  strDrinkFR: null | string;
  strDrinkZH_HANS: null | string;
  strDrinkZH_HANT: null | string;
  strTags: null | string;
  strVideo: null | string;
  strCategory: string;
  strIBA: null | string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: null | string;
  strInstructionsDE: null | string;
  strInstructionsFR: null | string;
  strInstructionsZH_HANS: null | string;
  strInstructionsZH_HANT: null | string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: null | string;
  strIngredient6: null | string;
  strIngredient7: null | string;
  strIngredient8: null | string;
  strIngredient9: null | string;
  strIngredient10: null | string;
  strIngredient11: null | string;
  strIngredient12: null | string;
  strIngredient13: null | string;
  strIngredient14: null | string;
  strIngredient15: null | string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: null | string;
  strMeasure6: null | string;
  strMeasure7: null | string;
  strMeasure8: null | string;
  strMeasure9: null | string;
  strMeasure10: null | string;
  strMeasure11: null | string;
  strMeasure12: null | string;
  strMeasure13: null | string;
  strMeasure14: null | string;
  strMeasure15: null | string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
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
};
