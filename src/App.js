import React from 'react';
import Routes from './routes';
import ThemeContextProvider from './context/ThemeProvider';

import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <ThemeContextProvider>
      <GlobalStyle />
      <Routes />
    </ThemeContextProvider>
  );
}

export default App;
