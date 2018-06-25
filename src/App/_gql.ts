import gql from 'graphql-tag'
export const example = gql`{
  rates(currency: "USD") {
    currency
    rate
  }
}
`
