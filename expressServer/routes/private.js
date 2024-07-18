const express = require('express')
const authMiddleware = require('../libraries/authorizationMiddleware.js')
const { User } = require('../database/models/User')
const { connectDB } = require('../database/database.js')

const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get('/me', async (req, res) => {
    try {
        return res.json({ message: 'Okay' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

privateRouter.get('/snakes', async (_, res) => {
    try {
        await connectDB()
        const users = await User.find({ username: /snake/i })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

privateRouter.get('/users', async (req, res) => {
    const { search } = req.query

    try {
        await connectDB()
        const users = await User.find({
            username: { $regex: search, $options: 'i' },
        })
        return res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = privateRouter
