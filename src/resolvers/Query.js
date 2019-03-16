async function gameReviews(parent, args, context, info) {

    const where =  args.filter ? { title_contains: args.filter } : {}

    const reviews = await context.prisma.reviews({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy
    })

    const count = await context.prisma
        .reviewsConnection({
        where,
        })
        .aggregate()
        .count()
    return {
        reviews,
        count,
    }
}
  
module.exports = {
    gameReviews,
}