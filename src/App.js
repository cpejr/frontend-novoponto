import React from 'react';
import Routes from './routes';
import ThemeContextProvider from './context/ThemeProvider';

function App() {
  return (
    <ThemeContextProvider>
      <Routes />
    </ThemeContextProvider>
  );
}

export default App;
