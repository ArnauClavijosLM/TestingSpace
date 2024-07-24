import { gql } from '@apollo/client'

export const GET_USER = gql`
    query getUser($id: ID!) {
        getUser(id: $id) {
            _id
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
