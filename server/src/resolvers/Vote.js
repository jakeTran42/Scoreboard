function review(parent, args, context) {
    return context.prisma.vote({ id: parent.id }).review()
}
  
function user(parent, args, context) {
    return context.prisma.vote({ id: parent.id }).user()
}
  
module.exports = {
    review,
    user,
}