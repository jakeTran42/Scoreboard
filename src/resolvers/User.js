function reviews(parent, args, context) {
    return context.prisma.user({ id: parent.id }).reviews()
  }
  
  module.exports = {
    reviews,
  }