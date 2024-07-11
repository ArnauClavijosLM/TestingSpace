// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

// const hashPassword = ( password, salt ) => {
//     const hash = crypto.createHash('sha3-512');
//     hash.update(password + salt);
//     return hash.digest('hex');
//     };

// const generateSalt = () => {
//     const salt = crypto.randomBytes(32).toString('hex');
//     return salt
//     };

// const generateJWT = (user) => {
//     const payload = {
//     userId: user._id,
//     username: user.username,
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
//     return token;
//   };

// module.exports = { generateSalt, hashPassword, generateJWT };
