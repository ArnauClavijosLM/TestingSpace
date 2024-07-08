const crypto = require('crypto');

function hashPassword(password, salt) {
  const hash = crypto.createHash('sha3-512');
  hash.update(password + salt);
  return hash.digest('hex');
}

module.exports = { hashPassword };
