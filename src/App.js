import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import moment from "moment";
import "moment/locale/pt-br";

import Routes from "./routes";
import ThemeContextProvider from "./context/ThemeProvider";
import SessionContextProvider from "./context/SessionProvider";
import GlobalStyle from "./styles/GlobalStyle";

import GlobalsContextProvider from "./context/GlobalsProvider";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API || "http://localhost:4000/",
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUB_API || "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
  },
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

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

moment.locale("pt-br");

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <ApolloProvider client={client}>
        <ThemeContextProvider>
          <SessionContextProvider>
            <GlobalsContextProvider>
              <GlobalStyle />
              <Routes />
            </GlobalsContextProvider>
          </SessionContextProvider>
        </ThemeContextProvider>
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default App;
