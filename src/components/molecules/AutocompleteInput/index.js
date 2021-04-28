import { Dropdown, Input, Menu } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { DefaultText } from "../../atoms";
import { AutocompleteInputContainer } from "./styles";

const AutocompleteInput = ({
  options = [],
  initValue,
  error = false,
  errorMessage,
  onSelect,
  value,
  ...props
}) => {
  const [data, setData] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    text: initValue ? initValue : value?.text,
  });

  const { activeSuggestion, filteredSuggestions, showSuggestions, text } = data;

  const showSuggestionsRef = useRef(showSuggestions);

  useEffect(() => {
    showSuggestionsRef.current = showSuggestions;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.showSuggestions]);

  const onChange = (e) => {
    const value = e.target.value;

    const filteredSuggestions = options.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(value.trim().toLowerCase())
    );

    setData({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions,
      showSuggestions: true,
      text: value,
    });

    const selectedOption = options.find(
      (suggestion) => suggestion.label === value
    );

    onSelect && onSelect(selectedOption);
    props?.onChange &&
      props.onChange({ text: value, selectedOption: selectedOption });
  };

  const onClick = (e) => {
    e.domEvent.preventDefault();
    const value = e.key;

    const selected = filteredSuggestions.find(
      (suggestion) => suggestion.value === value
    );

    setData({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      text: selected.label,
    });

    onSelect && onSelect(selected);
    props?.onChange &&
      props.onChange({ text: selected.label, selectedOption: selected });
  };

  const onBlur = (e) => {
    setTimeout(() => {
      if (showSuggestionsRef.current)
        setData({
          ...data,
          showSuggestions: false,
        });
    }, 200);
  };

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        if (filteredSuggestions.length > 0 && showSuggestions) {
          e.preventDefault();
          let option = data.filteredSuggestions[data.activeSuggestion];

          onSelect && onSelect(option);
          props?.onChange &&
            props.onChange({
              text: option.label,
              selectedOption: option,
            });

          return setData({
            ...data,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            text: option.label,
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

  useEffect(() => {
    setData({
      ...data,
      text: value?.text,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setData({
      ...data,
      text: text,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  let suggestionsMenu = (
    <Menu
      selectable
      selectedKeys={[filteredSuggestions[activeSuggestion]?.value]}
      onClick={onClick}
    >
      {filteredSuggestions.map(({ value, label }) => (
        <Menu.Item key={value}>{label}</Menu.Item>
      ))}
    </Menu>
  );

  const DropdownVisible =
    showSuggestions && filteredSuggestions.length > 0 && text;
  return (
    <AutocompleteInputContainer error={error}>
      <Dropdown
        overlay={suggestionsMenu}
        visible={DropdownVisible}
        overlayClassName="autoComplete"
      >
        <Input
          value={value?.text || data.text || ""}
          {...props}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          autoComplete="off"
        />
      </Dropdown>

      {error && <DefaultText error={error}>{errorMessage}</DefaultText>}
    </AutocompleteInputContainer>
  );
};

export default AutocompleteInput;
