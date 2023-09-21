import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import useFetchDrinks from '../../hooks/useFetchDrinks';
import useFetchMeal from '../../hooks/useFetchMeal';
import DrinksContext from '../../context/DrinkContext/DrinksContext';
import MealsContext from '../../context/MealContext/MealsContext';

// A pesquisa do usuário é armazenada num state. Quando o botão é apertado, as informações deste state vão para um segundo state
// O fetch é feito com as informações deste segundo state

function SearchBar() {
  const [searchInfo, setSearchInfo] = useState({ radio: '', search: '' });

  const [radioSelected, setRadioSelected] = useState('ingredient');
  const [userSearch, setUserSearch] = useState<string>('');

  const navigate = useNavigate();

  const { dataDrinks } = useFetchDrinks({
    userSearch: searchInfo.search, searchType: searchInfo.radio,
  });

  const { dataMeals } = useFetchMeal({
    userSearch: searchInfo.search, searchType: searchInfo.radio });

  const location = useLocation().pathname;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRadioSelected(value);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserSearch(value);
  };

  const { updateDrinks } = useContext(DrinksContext);
  const { updateMeals } = useContext(MealsContext);

  useEffect(() => {
    updateDrinks(dataDrinks);
    updateMeals(dataMeals);
  }, [searchInfo]);

  const handleSubmit = () => {
    setSearchInfo({
      ...searchInfo,
      radio: radioSelected,
      search: userSearch,
    });

    if (location === '/meals' && dataMeals.length === 1) {
      const mealId = dataMeals[0].idMeal;
      navigate(`/meals/${mealId}`);
    }
    if (location === '/drinks' && dataDrinks.length === 1) {
      const drinksId = dataDrinks[0].idMeal;
      navigate(`/meals/${drinksId}`);
    }
  };

  return (
    <div>
      <label>
        <input
          data-testid="search-input"
          name="searchBar"
          value={ userSearch }
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
