import { useLocation } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import useFetchDrinks from '../../hooks/useFetchDrinks';

function SearchBar() {
  const [disableFetch, setDisableFetch] = useState(false);
  const [
    radioSelected, setRadioSelected,
  ] = useState('ingredient');

  const [userSearch, setUserSearch] = useState<string>('');

  const locationMeal = useLocation().pathname === '/meal';
  const locationDrinks = useLocation().pathname === '/drinks';

  useFetchDrinks({ userSearch, searchType: radioSelected });

  // const { data, loading } = useFetchMeal({ userSearch, searchType: radioSelected });
  const { dataDrinks, loadingDrinks } = useFetchDrinks(
    { userSearch, searchType: radioSelected },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRadioSelected(value);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserSearch(value);
  };

  const handleSubmit = () => {
    setDisableFetch(!disableFetch);
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
