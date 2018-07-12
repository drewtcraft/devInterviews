const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || 'supersecuresecret';

function makeToken(payload) {
  console.log('making a token son')
  return jwt.sign(
      payload,
      secret
    )
}

function verify(token) {
    return jwt.verify(
      token,
      secret
      )
}


module.exports = {
  makeToken,
  verify};
