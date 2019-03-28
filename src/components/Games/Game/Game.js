import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Game.css'
import '../VisualComponents/RatingBar';
import RatingBar from '../VisualComponents/RatingBar';

class Game extends Component {
    state = { }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {

        if(!this.props.game) return <div>{this.props.history.push('/404')}</div>
        
        const { id, name, popularity, coverId, collection, first_release_date, genres, platforms, summary, themes, total_rating, total_rating_count, status, involved_companies } = {...this.props.game}
        const date = new Date(first_release_date * 1000)
        const released_date = () => {
            var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            var day = date.getDate();
            var month = months[date.getMonth()];
            var year = date.getFullYear()
            return new Array(month, day, year)
        }

        console.log(released_date())

        return ( 
            <div className="game-container">
                <i className="fas fa-window-close" onClick={this.props.goBackHandler} style={{fontSize: '2em'}}></i>
                <div className="game-data-wrapper">
                    <div className="left-display-wrapper">
                        <img id="source-img" src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverId}.jpg`} alt="N/A"/>
                        <div id="game-name-1">{name}</div>
                        <div id="general-info-div">
                            <div className="circular-div">
                                <RatingBar containerWidth={'100px'} fillStyle={'#252331'}>{total_rating.toFixed(0)}</RatingBar>
                            </div>
                            <div id="dev-div"><b style={{color: '#ed3b4d'}}>Companies</b> <div id="developers-list">{involved_companies.length > 0 ? (involved_companies.map((name) => <div key={name} id="developers-wrapper">{name}</div>)) : <div>N/A</div>}</div></div>
                            <div id="released-date-div"><b style={{color: '#ed3b4d'}}>Released</b><div id="date-div-game">{released_date().map((e) => <div>{e}</div>)}</div></div>
                        </div>
                    </div>
                    <div className="right-display-wrapper">
                        <Link to={{pathname: '/create', state: {id: id, name: name}}} >Create a Review for this game</Link>
                        <br/>{id} <br/>
                        {name}<br/>
                        {popularity}<br/>
                        {collection ? collection : 'N/A'}<br/>
                        {first_release_date}<br/>
                        {genres[0]}<br/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default withRouter(Game);