import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
      },
    },
  },
});

export const isLoggedInVar = cache.makeVar(!!localStorage.getItem("token"));
