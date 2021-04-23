import React, { useEffect, useState } from "react";
import { AutocompleteInputContainer } from "./styles";

const AutocompleteInput = ({
  options = [],
  initValue,
  error = false,
  errorMessage,
  ...props
}) => {
  const [data, setData] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: initValue ? initValue : "",
  });

  const {
    activeSuggestion,
    filteredSuggestions,
    showSuggestions,
    userInput,
  } = data;

  const onChange = (e) => {
    const value = e.currentTarget.value;

    const filteredSuggestions = options.filter((suggestion) => {
      return RegExp(value.trim(), "ig").test(suggestion);
    });

    setData({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions,
      showSuggestions: true,
      userInput: value,
    });

    props?.onChange && props.onChange(value);
  };

  const onClick = (e) => {
    const value = e.currentTarget.innerText;
    setData({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: value,
    });

    props?.onChange && props.onChange(value);
  };

  const onKeyDown = (e) => {
    props?.onKeyDown && props.onKeyDown(e);

    switch (e.keyCode) {
      case 13:
        if (filteredSuggestions.length > 0) {
          let value = data.filteredSuggestions[data.activeSuggestion];
          props?.onChange && props.onChange(value);

          return setData({
            ...data,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: value,
          });
        }
        return;

      // Arrow UP
      case 38:
        e.preventDefault();
        if (data.activeSuggestion === 0) return;
        else
          return setData({
            ...data,
            activeSuggestion: data.activeSuggestion - 1,
          });

      // Arrow Down
      case 40:
        e.preventDefault();
        if (data.activeSuggestion + 1 === data.filteredSuggestions.length)
          return;
        else
          return setData({
            ...data,
            activeSuggestion: data.activeSuggestion + 1,
          });

      default:
        break;
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
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
        <div className="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  useEffect(() => {
    setData({
      ...data,
      userInput: props.value,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <AutocompleteInputContainer error={error}>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={data.userInput || ""}
      />
      {suggestionsListComponent}
      {error && <span className="errorMessage">{errorMessage}</span>}
    </AutocompleteInputContainer>
  );
};

export default AutocompleteInput;
