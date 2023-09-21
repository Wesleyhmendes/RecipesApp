import { useLocation } from 'react-router-dom';
import { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import DrinksContext from '../../context/DrinkContext/DrinksContext';
import MealsContext from '../../context/MealContext/MealsContext';
import { FetchType } from '../../type';

function SearchBar() {
  const [userSearchInfo, setUserSearchInfo] = useState<FetchType>({
    radioSelected: 'ingredient',
    search: '',
  });

  const location = useLocation().pathname;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserSearchInfo({
      ...userSearchInfo,
      radioSelected: value,
    });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserSearchInfo({
      ...userSearchInfo,
      search: value,
    });
  };

  const { fetchDataMeals } = useContext(MealsContext);
  const { fetchDataDrinks } = useContext(DrinksContext);

  const handleSubmit = () => {
    if (location === '/meals') {
      fetchDataMeals(userSearchInfo);
    }
    if (location === '/drinks') {
      fetchDataDrinks(userSearchInfo);
    }
  };

  return (
    <div>
      <label>
        <input
          data-testid="search-input"
          name="searchBar"
          value={ userSearchInfo.search }
          onChange={ (event) => handleSearch(event) }
          type="text"
        />
      </label>
      <button
        onClick={ handleSubmit }
        data-testid="exec-search-btn"
      >
        Search
      </button>
      <br />
      <label>
        <input
          name="radioInput"
          defaultChecked
          value="ingredient"
          onChange={ (event) => handleChange(event) }
          data-testid="ingredient-search-radio"
          type="radio"
        />
        Ingredient
      </label>
      <label>
        <input
          name="radioInput"
          value="name"
          onChange={ (event) => handleChange(event) }
          data-testid="name-search-radio"
          type="radio"
        />
        Name
      </label>
      <label>
        <input
          name="radioInput"
          value="firstLetter"
          onChange={ (event) => handleChange(event) }
          data-testid="first-letter-search-radio"
          type="radio"
        />
        First Letter
      </label>
    </div>
  );
}

export default SearchBar;
