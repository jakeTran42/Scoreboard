const igdbAPI = require('../../datasource/igdbAPI')

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

async function gameReviewById(parent, args, context, info) {
    const where =  args.filter ? { id: args.filter } : {}
    const reviews = await context.prisma.reviews({
        where
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

async function igdbSearch(parent, args) {

    const category = ['Main Game', 'DLC', 'Expansion', 'Bundle', 'Standalone-Expansion']
    const status = ['Release', 'N/A', 'Alpha', 'Beta', 'Early Access', 'Offline', 'Cancelled']
    const gameData = await igdbAPI(args)

    const transformedData = gameData.map((game) => {
        return  { 
                    ...game,
                    category: category[game.category] || null,
                    coverId: game.cover ? `${game.cover.image_id}` : `nocover_qhhlj6`,
                    collection: game.collection ? game.collection.name : null,
                    status: game.status || status[1],
                    first_release_date: game.first_release_date || null,
                    popularity: game.popularity || null,
                    rating: game.rating || null,
                    total_rating: game.total_rating || null,
                    total_rating_count: game.total_rating_count || null,
                    summary: game.summary || null,
                    genres: game.genres ? game.genres.map((genre) => {
                        return genre.name
                    }) : [],
                    involved_companies: game.involved_companies ? game.involved_companies.map((company) => {
                        const companies = {name: company.company.name, developer: company.developer}
                        return companies
                    }) : [],
                    platforms: game.platforms ? game.platforms.map((platform) => {
                        return platform.name
                    }) : [],
                    themes: game.themes ? game.themes.map((theme) => {
                        return theme.name
                    }) : [],
                }
    })

    return transformedData
}
  
module.exports = {
    gameReviews,
    gameReviewById,
    igdbSearch
}