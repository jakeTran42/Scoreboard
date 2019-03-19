require('dotenv').config()
const rp = require('request-promise');
const axios = require('axios')

// axios.defaults.baseURL = 'https://api-v3.igdb.com/games';
axios.defaults.headers.get['user-key'] = process.env.IGDB_USER_KEY;
axios.defaults.headers.get['Accept'] = 'application/json';

module.exports = igdbSearch = async (args) => {

    const search = args.search ? `search "${args.search}";` : ''
    const fields = args.fields ? `fields ${args.fields};` : ''
    const filter = args.filter ? `where ${args.filter};` : ''
    const limit = args.limit ? `limit ${args.limit};` : ''
    const sort = args.sort ? `sort ${args.sort};` : ''

    const dataBody = search+fields+filter+limit+sort

    try {
        var result = await axios({
            url: `https://api-v3.igdb.com/${args.path}`,
            method: 'GET',
            data: dataBody,
            responseType: 'json',
        })
        return result.data
    } catch (err) {
        console.log(err)
    }
}