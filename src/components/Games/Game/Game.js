import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Game.css'

class Game extends Component {
    // state = { }


    render() {
        const {id, name, popularity, coverId, collection, first_release_date, genres, platforms, summary, themes, total_rating, total_rating_count, status} = {...this.props.game}
        return ( 
            <div>
                <div onClick={() => this.props.history.go(0)} >Go back</div>
                <Link to={{pathname: '/create', state: {id: id, name: name}}} >Create a Review for this game</Link>
                <img src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverId}.jpg`} />
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
 
export default withRouter(Game);