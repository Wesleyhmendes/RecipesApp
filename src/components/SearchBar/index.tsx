import { useLocation } from 'react-router-dom';
import { ChangeEvent, useContext, useState } from 'react';
import DrinksContext from '../../context/DrinkContext/DrinksContext';
import MealsContext from '../../context/MealContext/MealsContext';
import { FetchType } from '../../type';
import lupeIcon from '../../assets/Icons/search-lupe.svg';
import style from './style.module.css';

function SearchBar() {
  const [userSearchInfo, setUserSearchInfo] = useState<FetchType>({
    radioSelected: 'ingredient',
    search: '',
  });

  const { fetchDataMeals } = useContext(MealsContext);
  const { fetchDataDrinks } = useContext(DrinksContext);

  const location = useLocation().pathname;

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setUserSearchInfo({
      ...userSearchInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (location === '/meals') {
      fetchDataMeals(userSearchInfo);
    }
    if (location === '/drinks') {
      fetchDataDrinks(userSearchInfo);
    }
  };

  const selectedRadio = userSearchInfo.radioSelected;

  return (
    <div className={ style.searchBarMainDiv }>
      <div className={ style.searchBarInputAndBtn }>
        <label>
          <input
            className={ style.searchBarInput }
            data-testid="search-input"
            name="search"
            value={ userSearchInfo.search }
            onChange={ (event) => handleChange(event) }
            type="text"
          />
        </label>
        <button
          className={ style.searchBarBtn }
          onClick={ handleSubmit }
          data-testid="exec-search-btn"
        >
          <img
            src={ lupeIcon }
            alt="pesquisar"
          />
        </button>
      </div>
      <br />
      <div className={ style.searchBarFilters }>
        <div
          className={ `${selectedRadio === 'ingredient' ? style
            .searchBarFiltersInsideDivTrue : style.searchBarFiltersInsideDivFalse}` }
        >
          <label>
            <input
              className={ style.searchBarFilterInput }
              name="radioSelected"
              value="ingredient"
              onChange={ (event) => handleChange(event) }
              data-testid="ingredient-search-radio"
              type="radio"
            />
            <p
              className={ `${selectedRadio === 'ingredient' ? style
                .searchBarFilterTextTrue : style.searchBarFilterTextFalse}` }
            >
              Ingredient
            </p>
          </label>
        </div>
        <div
          className={ `${selectedRadio === 'name' ? style
            .searchBarFiltersInsideDivTrue : style.searchBarFiltersInsideDivFalse}` }
        >
          <label>
            <input
              className={ style.searchBarFilterInput }
              name="radioSelected"
              value="name"
              onChange={ (event) => handleChange(event) }
              data-testid="name-search-radio"
              type="radio"
            />
            <p
              className={ `${selectedRadio === 'name' ? style
                .searchBarFilterTextTrue : style.searchBarFilterTextFalse}` }
            >
              Name
            </p>
          </label>
        </div>
        <div
          className={ `${selectedRadio === 'firstLetter' ? style
            .searchBarFiltersInsideDivTrue : style.searchBarFiltersInsideDivFalse}` }
        >
          <label>
            <input
              className={ style.searchBarFilterInput }
              name="radioSelected"
              value="firstLetter"
              onChange={ (event) => handleChange(event) }
              data-testid="first-letter-search-radio"
              type="radio"
            />
            <p
              className={ `${selectedRadio === 'firstLetter' ? style
                .searchBarFilterTextTrue : style.searchBarFilterTextFalse}` }
            >
              First Letter
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
