require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../scoreboard-mongo/generated/prisma-client')

// 2
const resolvers = {
  Query: {
    info: (root, args) => args.context,
    reviews: (parent, args, context, info) => {
      return context.prisma.reviews()
    }
  },

  Mutation: {
    postReview: (parent, args, context) => {
      return context.prisma.createReview({
        igdbId: args.igdbId,
        igdbTitle: args.igdbTitle,
        title: args.title,
        content: args.content,
        score: args.score,
      })
    }
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`)) 