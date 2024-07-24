const jwt = require('jsonwebtoken')
const { User } = require('../database/models/User')

const authMiddleware = async (req, res, next) => {
    let token = req.headers['authorization']

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' })
    }

    token = token.replace('Bearer ', '')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        req.user = decoded

        const user = await User.findById(req.user.userId)

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' })
        }

        req.userDetails = user
        next()
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' })
    }
}

module.exports = authMiddleware
