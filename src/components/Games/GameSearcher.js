import React, { Component } from 'react';
import GamesFeed from './GamesFeed/GamesFeed';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import './GameSearcher.css'


const GAME_SEARCH_QUERY = gql`
    query GameQuery($path: String, $filter: String, $fields: String, $limit: Int, $sort: String) {
        igdbSearch(path: $path, filter: $filter, fields: $fields, limit: $limit, sort: $sort){
            id,
            name
            popularity,
            coverId,
            collection,
            first_release_date,
            genres,
            platforms,
            summary,
            themes,
            total_rating,
            total_rating_count,
            status
        }
    }
`

var d = new Date()
d.setFullYear(d.getFullYear()-1);
const setReleasedDate = (d / 1000).toFixed(0)

class GameSeacher extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            path: 'games',
            filter: `first_release_date > ${setReleasedDate} & rating > 80`,
            limit: 5
        }
    }
    
    render() { 

        const vars = {
            path: this.state.path,
            filter: this.state.filter,
            fields: 'id,name,slug,popularity,cover.image_id,collection.name,first_release_date,genres.name,platforms.name,summary,themes.name,total_rating,total_rating_count,status',
            limit: this.state.limit,
            sort: 'popularity desc'
        }


        return (
        <div className="container">
            <label>Search: </label>
            <input type="text"
            onChange={e => this.setState(
                {
                    filter: e.target.value ? `name ~ *"${e.target.value}"*` : `first_release_date > ${setReleasedDate} & rating > 80`,
                    limit: e.target.value ? 50 : 5
                })
            }
            />
            <Query query={GAME_SEARCH_QUERY} variables={vars}>
                {({ loading, error, data }) => {
                    if (loading) return <div className="loader"></div>
                    if (error) return <div>Error</div>
                
                    const gamesToRender = data.igdbSearch
                    return (
                        <div>
                            <GamesFeed games={gamesToRender}/>
                        </div>
                    )
                }}
            </Query>
        </div>
        )
    }
}
 
export default GameSeacher;