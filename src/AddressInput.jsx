// AddressInput.jsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const SearchIco = (
  <svg xmlns="http://www.w3.org/2000/svg" className='search_icon' viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.8004 4.1999C7.15531 4.1999 4.20039 7.15482 4.20039 10.7999C4.20039 14.445 7.15531 17.3999 10.8004 17.3999C12.6232 17.3999 14.2719 16.6622 15.4673 15.4668C16.6626 14.2715 17.4004 12.6227 17.4004 10.7999C17.4004 7.15482 14.4455 4.1999 10.8004 4.1999ZM2.40039 10.7999C2.40039 6.16071 6.1612 2.3999 10.8004 2.3999C15.4396 2.3999 19.2004 6.16071 19.2004 10.7999C19.2004 12.7949 18.504 14.6286 17.3425 16.0692L21.3368 20.0635C21.6883 20.415 21.6883 20.9848 21.3368 21.3363C20.9853 21.6878 20.4155 21.6878 20.064 21.3363L16.0697 17.342C14.6291 18.5035 12.7954 19.1999 10.8004 19.1999C6.1612 19.1999 2.40039 15.4391 2.40039 10.7999Z" />
  </svg>
)

const CrossIco = ({ onClick }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className='cross_icon' viewBox="0 0 24 24" fill="none" onClick={onClick}>
      <path d="M7.5364 6.2636C7.18492 5.91213 6.61508 5.91213 6.2636 6.2636C5.91213 6.61508 5.91213 7.18492 6.2636 7.5364L10.7272 12L6.2636 16.4636C5.91213 16.8151 5.91213 17.3849 6.2636 17.7364C6.61508 18.0879 7.18492 18.0879 7.5364 17.7364L12 13.2728L16.4636 17.7364C16.8151 18.0879 17.3849 18.0879 17.7364 17.7364C18.0879 17.3849 18.0879 16.8151 17.7364 16.4636L13.2728 12L17.7364 7.5364C18.0879 7.18492 18.0879 6.61508 17.7364 6.2636C17.3849 5.91213 16.8151 5.91213 16.4636 6.2636L12 10.7272L7.5364 6.2636Z" />
    </svg>
  )
}
// const CrossIco = (

// )

function AddressInput({ onAddressSelect, onInputChange }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const debouncedFetchSuggestions = useCallback(
    debounce(async (value) => {
      if (value.length > 2) {
        setIsLoading(true);
        setNoResults(false);
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
          );
          setSuggestions(response.data);
          setNoResults(response.data.length === 0);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching address suggestions:', error);
          setSuggestions([]);
          setNoResults(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setNoResults(false);
        setShowSuggestions(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onInputChange(value);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.display_name);
    setSuggestions([]);
    setNoResults(false);
    setShowSuggestions(false);
    onAddressSelect({
      display_name: suggestion.display_name,
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon)
    });
  };

  const handleClearInput = () => {
    setQuery('');
    setSuggestions([]);
    setNoResults(false);
    setShowSuggestions(false);
    onInputChange('');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="address-input" ref={wrapperRef}>
      {SearchIco}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your home address"
      />
      {query &&
        <CrossIco
          onClick={handleClearInput}
        />
      }
      {isLoading && <div className="loading-spinner"></div>}
      {noResults && showSuggestions && <div className="no-results">No results found</div>}
      {suggestions.length > 0 && showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddressInput;