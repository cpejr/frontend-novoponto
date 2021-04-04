import React from "react";
import Routes from "./routes";
import ThemeContextProvider from "./context/ThemeProvider";

import GlobalStyle from "./styles/GlobalStyle";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeContextProvider>
        <GlobalStyle />
        <Routes />
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default App;
