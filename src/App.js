import React from "react";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import Routes from "./routes";
import ThemeContextProvider from "./context/ThemeProvider";
import SessionContextProvider from "./context/SessionProvider";
import GlobalStyle from "./styles/GlobalStyle";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const authToken = localStorage.getItem("accessToken");

  if (authToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeContextProvider>
        <SessionContextProvider>
          <GlobalStyle />
          <Routes />
        </SessionContextProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default App;
