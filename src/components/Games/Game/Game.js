import React, { Component } from 'react';
import './Game.css'

class Game extends Component {
    // state = { }


    render() {
        const {id, name, popularity, coverId, collection, first_release_date, genres, platforms, summary, themes, total_rating, total_rating_count, status} = {...this.props.game}
        return ( 
            <div>
                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${coverId}.jpg`} />
                <br/>{id} <br/>
                {name}<br/>
                {popularity}<br/>
                {collection ? collection : 'N/A'}<br/>
                {first_release_date}<br/>
                {genres[0]}<br/>

            </div>
         );
    }
}
 
export default Game;