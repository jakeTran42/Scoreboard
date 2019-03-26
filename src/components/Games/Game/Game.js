import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Game.css'
import '../VisualComponents/RatingBar';
import RatingBar from '../VisualComponents/RatingBar';

class Game extends Component {
    // state = { }
    render() {

        if(!this.props.game) return <div>{this.props.history.push('/404')}</div>
        
        const { id, name, popularity, coverId, collection, first_release_date, genres, platforms, summary, themes, total_rating, total_rating_count, status } = {...this.props.game}
        return ( 
            <div>
                <RatingBar containerWidth={'100px'}>{total_rating.toFixed(0)}</RatingBar>
                <div onClick={this.props.handler} >Go back</div>
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