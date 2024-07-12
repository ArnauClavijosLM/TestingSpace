const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const hashPassword = ( password, salt ) => {
    const hash = crypto.createHash('sha3-512');
    hash.update(password + salt);
    return hash.digest('hex');
    };

const generateSalt = () => crypto.randomBytes(32).toString('hex')

const generateJWT = (user) => {
    console.log("entering jtw gen")
    const payload = {
    userId: user._id,
    };
    console.log("jtw variables loaded")
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log("token generated")
    return token;
  };

module.exports = { generateSalt, hashPassword, generateJWT };
