import { ChangeEvent, useState } from 'react';
import useFetch from '../hooks/useFetch';

function SearchBar() {
  const [
    radioSelected, setRadioSelected,
  ] = useState('ingredient');

  const [inputCheck, setInputCheck] = useState(true);

  const [userSearch, setUserSearch] = useState<string>('');

  const { data, loading } = useFetch({ userSearch, searchType: radioSelected });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRadioSelected(value);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserSearch(value);
  };

  return (
    <div>
      <label>
        <input
          name="searchBar"
          value={ userSearch }
          onChange={ (event) => handleSearch(event) }
          type="text"
        />
      </label>
      <button
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
