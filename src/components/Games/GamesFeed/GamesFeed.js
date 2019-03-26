import React, { Component } from 'react';
import './GamesFeed.css';
import Game from '../Game/Game';
import { Link } from 'react-router-dom';
import RatingBar from '../VisualComponents/RatingBar';

class GamesFeed extends Component {
    constructor(props) {
        super(props);
        this.state = { gameMetaData: null };
        this.goBackHandler = this.goBackHandler.bind(this)
    }

    goBackHandler(){
        this.setState({ gameMetaData: null })
    }

    render() {
        return (
            <div>
                {this.state.gameMetaData ?
                    <Game game={this.state.gameMetaData} handler={this.goBackHandler} /> :
                    this.showFeeds()
                }
            </div>
        )
    }

    showFeeds() {
        return (<div className="feedContainer">
            {this.props.games.map((game) => 
            <div key={game.id} className="games-data">
                <div className="gameFeedImages">
                    <img src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.coverId}.jpg`} alt={''}/>
                </div>

                <div className="meta-data">
                    <div id="data-points">
                        <div id="name-tag" onClick={() => this.setState({ gameMetaData: game })}>{game.name}</div>
                        <div id="genre-tag">{game.genres.join(" | ")}</div>
                        <div id="platform-tag">{game.platforms.join(" | ")}</div>
                        <div id="theme-tag">{game.themes.join(" | ")}</div>
                        <div id="game-released-date">Released: {(new Date(game.first_release_date * 1000)).toLocaleDateString()}</div>
                    </div>
                    <div id="links-traversal">
                        <Link to={{pathname: '/create', state: {id: game.id, name: game.name}}} >Create Review</Link>
                    </div>
                </div>

                <div className="scoreContainer" >
                    <RatingBar containerWidth={'70%'}>{game.total_rating}</RatingBar>
                </div>
            </div>)}
        </div>)
    }
}

export default GamesFeed;