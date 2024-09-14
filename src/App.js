import React, { useState, useEffect, useRef } from 'react';
import countriesData from './countryData.json';

const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);
    if (userInput.length > 0) {
      const matches = countriesData.filter((country) => {
        const countryName = country.country.toLowerCase();
        const countryCapital = country.capital.toLowerCase();
        return (
          countryName.includes(userInput.toLowerCase()) ||
          countryCapital.includes(userInput.toLowerCase())
        );
      });
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setQuery(country.country);
    setSuggestions([]);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #333;
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            text-align: center;
          }
          .search-container {
            position: relative;
            max-width: 600px;
            width: 100%;
            margin-bottom: 20px;
          }
          .search-input {
            width: 100%;
            padding: 15px 50px 15px 20px;
            border-radius: 30px;
            font-size: 18px;
            border: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.8);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }
          .search-input:focus {
            background-color: rgba(255, 255, 255, 1);
            outline: none;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          }
          .suggestions {
            position: absolute;
            width: 100%;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            max-height: 300px;
            overflow-y: auto;
            margin-top: 5px;
          }
          .suggestion-item {
            padding: 12px;
            text-align: left;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .suggestion-item:hover {
            background-color: rgba(103, 126, 234, 0.1);
          }
          .country-details {
            max-width: 600px;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.95);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .country-details:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          }
          .country-name {
            font-size: 30px;
            margin-bottom: 15px;
            color: #4a5568;
          }
          .country-info {
            margin-bottom: 10px;
            font-size: 18px;
            color: #4a5568;
          }
          .info-label {
            font-weight: 600;
            color: #667eea;
          }
        `}
      </style>
      <div className="container">
        <h1>Country Search</h1>
        <div className="search-container" ref={searchRef}>
          <input
            type="text"
            placeholder="Search by country or capital"
            value={query}
            onChange={handleSearch}
            className="search-input"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((country) => (
                <li
                  key={country.country}
                  onClick={() => handleSelectCountry(country)}
                  className="suggestion-item"
                >
                  🌍 {country.country} - {country.capital}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedCountry && (
          <div className="country-details">
            <h2 className="country-name">{selectedCountry.country}</h2>
            <p className="country-info">
              <span className="info-label">📍 Capital:</span> {selectedCountry.capital}
            </p>
            <p className="country-info">
              <span className="info-label">👥 Population:</span> {selectedCountry.population.toLocaleString()}
            </p>
            <p className="country-info">
              <span className="info-label">🗣️ Language:</span> {Array.isArray(selectedCountry.official_language) ? selectedCountry.official_language.join(', ') : selectedCountry.official_language}
            </p>
            <p className="country-info">
              <span className="info-label">💰 Currency:</span> {selectedCountry.currency}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CountrySearch;
