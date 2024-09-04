import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// Set up the HTTP link with your base URL
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL, // Base URL for GraphQL requests
})

// Set up the auth link to include the Authorization header with the token
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token') // Retrieve the token from localStorage
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

// Create the Apollo Client instance
const client = new ApolloClient({
    link: authLink.concat(httpLink), // Combine the auth link and the HTTP link
    cache: new InMemoryCache(), // Initialize cache
})

export default client
