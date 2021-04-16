import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import moment from "moment";
import "moment/locale/pt-br";

import Routes from "./routes";
import ThemeContextProvider from "./context/ThemeProvider";
import SessionContextProvider from "./context/SessionProvider";
import GlobalStyle from "./styles/GlobalStyle";
import "./styles/compiled/antd.css"; // Tema do ant design
import GlobalsContextProvider from "./context/GlobalsProvider";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API || "http://localhost:4000/",
});
  console.log("🚀 ~ file: App.js ~ line 25 ~ process.env", process.env)

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
