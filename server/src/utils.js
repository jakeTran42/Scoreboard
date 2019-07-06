require('dotenv').config();
const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.APP_SECRET

function getUserId(context) {
  // console.log("util is getting call")
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    // const { userId } = jwt.verify(token, APP_SECRET)
    const { userId } = jwt.verify(token, "iwillgameforever")
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}