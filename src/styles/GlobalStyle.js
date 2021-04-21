import { createGlobalStyle } from "styled-components";

// Tema do ant design
if (true) require("./compiled/antdDark.css");
else require("./compiled/antdLight.css");

const GlobalStyle = createGlobalStyle`
 * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: auto;
    width: auto;
    
    font-family: 'Inter', BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4{
    margin: 0;
  }
`;

export default GlobalStyle;
