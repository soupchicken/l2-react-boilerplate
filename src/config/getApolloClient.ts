import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch'

const getApolloClient = ( apolloState:any ) => {
  console.log(apolloState, "MY MAN");
  return new ApolloClient({
    ssrMode:true,
    link: new HttpLink({
      uri: "https://w5xlvm3vzz.lp.gql.zone/graphql",
      fetch
    }),
    cache: apolloState ?
      new InMemoryCache().restore( apolloState ) :
      new InMemoryCache()
  });
}

export default getApolloClient
