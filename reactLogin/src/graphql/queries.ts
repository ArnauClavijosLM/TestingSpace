import { gql } from '@apollo/client'

export const GET_USER = gql`
    query getUser($_id: ID!) {
        getUser(_id: $_id) {
            username
        }
    }
`

export const GET_ALL_USERS = gql`
    query getAllUsers {
        getAllUsers {
            _id
            username
        }
    }
`
