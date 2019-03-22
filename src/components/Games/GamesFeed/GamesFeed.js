import React, { Component } from 'react';
import './GamesFeed.css';
import Game from '../Game/Game'

class GamesFeed extends Component {
    constructor(props) {
        super(props);
        this.state = { gameMetaData: null }
    }

    setGameMetaData = (data) => {
        this.setState({ gameMetaData: data })
    }

    render() {
        return (
            <div>
                {this.state.gameMetaData ?
                    <Game game={this.state.gameMetaData} /> :
                    this.showFeeds()
                }
            </div>
        );
    }

    showFeeds() {
        return <div className="feedContainer">
            {this.props.games.map((game) => 
            <div onClick={() => this.setState({ gameMetaData: game })} key={game.id} className="eachGame">
                <div className="gameFeedImages">
                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.coverId}.jpg`} alt={''}/>
                </div>
                <div className="metaData">
                    {game.id} | {game.name}
                </div>
                <div className="scoreContainer">
                    {game.total_rating}
                </div>
            </div>)}
        </div>;
    }
}

export default GamesFeed;