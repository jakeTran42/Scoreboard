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
    const acceptedWebsites = {1: 'official', 2: 'wikia', 13: 'steam', 14: 'reddit', 15: 'discord'}
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
                    websites: game.websites 
                    ? game.websites.filter((site) => {
                        let keys = Object.keys(acceptedWebsites).map(Number)
                        return keys.includes(site.category)
                    })
                    : [],
                    game_modes: game.game_modes
                    ? game.game_modes.map((mode) => ({name: mode.name, slug: mode.slug}))
                    : [],
                    dlcs: game.dlcs
                    ? game.dlcs.map((dlc) => ({type: 'DLC', id: dlc.id, slug: dlc.slug, name: dlc.name}))
                    : [],
                    bundles: game.bundles
                    ? game.bundles.map((bundle) => ({type: 'Bundle', id: bundle.id, slug: bundle.slug, name: bundle.name}))
                    : [],
                    expansions: game.expansions
                    ? game.expansions.map((expansion) => ({type: 'Expansion', id: expansion.id, slug: expansion.slug, name: expansion.name}))
                    : [],
                    screenshots: game.screenshots
                    ? game.screenshots.map((image) => image.image_id)
                    : [],
                }
    })
    return transformedData
}
  
module.exports = {
    gameReviews,
    gameReviewById,
    igdbSearch
}