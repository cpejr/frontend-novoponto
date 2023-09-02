import React, { createContext, useState } from "react";
// import api from "../services/api";
import { colors, themedColors } from './pallete';
import { GET_COLORS } from "../../graphql/Color"; 
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("dark");
  const [themeColors, setThemeColors] = useState(themedColors["light"]);
  const [colorsFromPallete, setColorsFromPallete] = useState(colors);

  const { loading, error, data } = useQuery(GET_COLORS); // Use useQuery para buscar os dados

  useEffect(() => {
    if (!loading && !error && data && data.colors) {
      console.log(data.colors);
      const { primaryColor, secondaryColor } = data.colors[0];
      console.log(primaryColor);
      colors.primaryColor = primaryColor;
      colors.secondaryColor = secondaryColor;
      setColorsFromPallete({
        ...colorsFromPallete,
        primaryColor,
        secondaryColor,
      });
    }
  }, [loading, error, data]);



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
