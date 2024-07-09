const crypto = require('crypto');

const saltUser = () => {
    const salt = crypto.randomBytes(32).toString('hex');
    return (salt)
}

module.exports = { saltUser };
