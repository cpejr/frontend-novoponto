import React, { createContext, useState } from "react";
// import api from "../services/api";

import { colors, themedColors } from './pallete';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  // Somente nome
  const [theme, setTheme] = useState("dark");

  // Nome seleciona o tema com cores ja configuradas
  const [themeColors, setThemeColors] = useState(themedColors["dark"]);

  // Cores 
  const [colorsFromPallete, setColorsFromPallete] = useState(colors);

  const swicthTheme = (newTheme) => {
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ swicthTheme, themeColors, setThemeColors, colorsFromPallete}}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
