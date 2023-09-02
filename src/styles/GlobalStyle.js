import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import { colors } from "../context/ThemeProvider/pallete";

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

    .ant-picker-panels {
      @media (max-width: 560px) {
        flex-direction: column;
      }
    }
  }

  h1, h2, h3, h4{
    margin: 0;
  }

  .autoComplete {

    .ant-dropdown-menu {
      max-height: 250px;
      overflow: auto;
    }

    ::-webkit-scrollbar {
      width: 15px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      width: 5px;
      background: ${colors.white};
      border-radius: 10px;
    }      
  }

  ::-webkit-scrollbar-track {
    background-color: ${colors.statusBar};
  }
  
  ::-webkit-scrollbar {
    width: 5px;
    background: ${colors.statusBar};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${colors.yellowCPE};
    border-radius: 20px;
  }

  .anticon {
    vertical-align: 1px;
  }
`;

export default GlobalStyle;
