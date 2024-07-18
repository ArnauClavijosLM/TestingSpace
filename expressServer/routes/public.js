const express = require('express')
const { User } = require('../database/models/User')
const { hashPassword, generateJWT } = require('../libraries/encryptionLib.js')
const { connectDB } = require('../database/database.js')

const publicRouter = express.Router()

publicRouter.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        await connectDB()

        const user = await User.findOne({ username })
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Incorrect username or password' })
        }

        const salt = user.salt
        const introducedHash = hashPassword(password, salt)

        if (introducedHash !== user.hash) {
            return res
                .status(401)
                .json({ message: 'Incorrect username or password' })
        }

        const token = generateJWT(user)

        return res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.error('Error during login:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = publicRouter
