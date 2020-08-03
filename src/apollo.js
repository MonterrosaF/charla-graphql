require("dotenv").config();

import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";

const token = process.env.TOKEN_API;

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${token}`,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
