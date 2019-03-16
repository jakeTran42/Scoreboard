require('dotenv').config()
const apicalypse = require('apicalypse')

async function igdbSearch(path, search, fields, filter, limit, sort) {

    console.log(path, search, fields, filter, limit, sort)

    const requestOptions = {
        queryMethod: 'url',
        method: 'post', // The default is `get`
        baseURL: 'https://api-v3.igdb.com/',
        headers: {
            'Accept': 'application/json',
            'user-key': process.env.IGDB_USER_KEY
        },
        responseType: 'json',
        // timeout: 1000, // 1 second timeout
        // auth: { // Basic auth
        //     username: 'janedoe',
        //     password: 's00pers3cret'
        // }
    };
    
    const response = await apicalypse(requestOptions)
        .search(`${search}`)
        .fields(`${fields}`)
        .limit(`${limit}`)    
        .query(`${filter}`)
        .sort(`${sort}`)
        // After setting the baseURL in the requestOptions,
        // you can just use an endpoint in the request
        .request(`/${path}`); 
    
    // console.log(response.data);
}

module.exports = {
    igdbSearch
}