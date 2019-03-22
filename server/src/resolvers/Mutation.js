const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator');
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    if (!validator.isEmail(args.email)) {
        throw new Error("Not an email")
    }
    // 1
    const password = await bcrypt.hash(args.password, 10)
    // 2
    const user = await context.prisma.createUser({ ...args, password })
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    // 4
    return {
      token,
      user,
    }
}
  
async function login(parent, args, context, info) {
    if (args.email && !validator.isEmail(args.email)) {
        throw new Error("Not an email")
    }
    // 1

    const user = (await (context.prisma.user({ username: args.loginIdentifier }))) ||
                 (await (context.prisma.user({ email: args.loginIdentifier })))

    // if (args.username) {
    //     user = await (context.prisma.user({ username: args.username }))
    // } else {
    //     user = await (context.prisma.user({ email: args.email }))
    // }

    if (!user) {
        throw new Error('No such user found')
    }

    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 3
    return {
        token,
        user,
    }
}

function postReview(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createReview({
        igdbId: args.igdbId,
        igdbTitle: args.igdbTitle,
        title: args.title,
        content: args.content,
        score: args.score,
        postedBy: { connect: { id: userId } },
    })
}

async function vote(parent, args, context, info) {
    // 1
    const userId = getUserId(context)
  
    // 2
    const reviewExists = await context.prisma.$exists.vote({
      user: { id: userId },
      review: { id: args.reviewId },
    })
    if (reviewExists) {
      throw new Error(`Already voted for review: ${args.reviewId}`)
    }
  
    // 3
    return context.prisma.createVote({
      user: { connect: { id: userId } },
      review: { connect: { id: args.reviewId } },
    })
  }
  
module.exports = {
    signup,
    login,
    postReview,
    vote
}