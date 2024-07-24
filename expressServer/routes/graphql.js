const express = require('express')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServer } = require('@apollo/server')
const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')
const { connectDB } = require('../database/database.js')

const server = new ApolloServer({ typeDefs, resolvers })
server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()

const graphqlRouter = express.Router()

graphqlRouter.use(
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            console.log(res.data)
            return {
                expressRequest: req,
                expressResponse: res,
                db: await connectDB(),
            }
        },
    })
)

module.exports = graphqlRouter
