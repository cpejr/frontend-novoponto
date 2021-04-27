import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { DefaultText } from "../../atoms";
import { AutocompleteInputContainer } from "./styles";

const AutocompleteInput = ({
  options = [],
  initValue,
  error = false,
  errorMessage,
  onTextChange,
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
    const value = e.target.value;

    const filteredSuggestions = options.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(value.trim().toLowerCase())
    );

    setData({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions,
      showSuggestions: true,
      userInput: value,
    });

    onTextChange && onTextChange(value);
    props?.onChange && props.onChange(options[data.activeSuggestion].value);
  };

  const onClick = (e) => {
    const index = e.target.getAttribute("data-index");

    const { label, value } = filteredSuggestions[index];

    setData({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: label,
    });

    onTextChange && onTextChange(label);
    props?.onChange && props.onChange(value);
  };

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        if (filteredSuggestions.length > 0) {
          e.preventDefault();
          let option = data.filteredSuggestions[data.activeSuggestion];

          onTextChange && onTextChange(option.label);
          props?.onChange && props.onChange(option.value);

          return setData({
            ...data,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: option.label,
          });
        }
        break;

      // Arrow UP
      case 38:
        e.preventDefault();
        if (data.activeSuggestion === 0) return;
        else
          setData({
            ...data,
            activeSuggestion: data.activeSuggestion - 1,
          });
        break;

      // Arrow Down
      case 40:
        e.preventDefault();
        if (data.activeSuggestion + 1 !== data.filteredSuggestions.length)
          return setData({
            ...data,
            activeSuggestion: data.activeSuggestion + 1,
          });
        break;

      default:
        break;
    }

    props?.onKeyDown && props.onKeyDown(e);
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map(({ value, label }, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li
                className={className}
                key={index}
                value={value}
                data-index={index}
                onClick={onClick}
              >
                {label}
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
      <Input
        {...props}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={data.userInput || ""}
      />
      {suggestionsListComponent}
      {error && <DefaultText error={error}>{errorMessage}</DefaultText>}
    </AutocompleteInputContainer>
  );
};

export default AutocompleteInput;
