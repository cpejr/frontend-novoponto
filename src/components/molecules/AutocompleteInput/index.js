import React, { useState } from 'react';
import { AutocompleteInputContainer } from './styles';

const AutocompleteInput = ({options = [], setMemberToLogin}) => {

    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState("");

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
    
        const filteredSuggestions = options.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(e.currentTarget.value);
        setMemberToLogin(e.currentTarget.value);
    };

    const onClick = e => {
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
        setMemberToLogin(e.currentTarget.innerText);
    };

    const onKeyDown = e => {
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[activeSuggestion]);
            setMemberToLogin(filteredSuggestions[activeSuggestion]);
        }
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            
            setActiveSuggestion(activeSuggestion + 1);
        }
    };

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
        <AutocompleteInputContainer>
                <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                />
                {suggestionsListComponent}
        </AutocompleteInputContainer>
    );
}

export default AutocompleteInput;

