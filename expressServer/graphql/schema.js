const typeDefs = `
    type User {
        _id: ID!
        username: String!
    }

    type Query {
        getUser: [User]
        getAllUsers: [User]
    }
`

module.exports = typeDefs
