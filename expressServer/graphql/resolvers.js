const { User } = require('../database/models/User')

const resolvers = {
    Query: {
        getUser: async (parent, args) => {
            return await User.findById(args.id).exec()
        },
        getAllUsers: async () => {
            return await User.find().exec()
        },
    },
}

module.exports = resolvers
