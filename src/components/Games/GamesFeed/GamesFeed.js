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

    render() {
        return (
            <div>
                {this.state.gameMetaData ?
                    <Game game={this.state.gameMetaData} goBackHandler={this.goBackHandler} /> :
                    this.showFeeds()
                }
            </div>
        )
    }

    goBackHandler(){
        this.setState({ gameMetaData: null })
    }

    checkNSFW(arr) {
        if (arr) {
            return arr.includes("Erotic")
        }
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
                        <div id="title-tag"><div id="game-name" onClick={() => this.setState({ gameMetaData: game })} >{game.name}</div>{this.checkNSFW(game.themes) ? <div id="nsfw-tag">nfsw</div> : ''}</div>
                        <div id="genre-tags">{game.genres.map((genre) => <div id="tag" key={genre}>{genre}</div>)}</div>
                        <div id="theme-tags">{game.themes.map((theme) => <div id="tag" key={theme}>{theme}</div>)}</div>
                        <div id="platform-tags">{game.platforms.map((platform) => {
                            if(platform === "PC (Microsoft Windows)") {
                                return <div key={platform} id="tag">PC</div>
                            }
                            return <div id="tag" key={platform}>{platform}</div>
                        })}</div>
                        <div id="game-released-date">Released: {(new Date(game.first_release_date * 1000)).toLocaleDateString()}</div>
                    </div>

                    <div id="links-traversal">
                        <Link to={{pathname: '/create', state: {id: game.id, name: game.name}}} >Create Review</Link>
                    </div>
                </div>

                <div className="scoreContainer" >
                    <RatingBar containerWidth={'70%'} fillStyle={'#f4f7f6'}>{game.total_rating}</RatingBar>
                </div>
            </div>)}
        </div>)
    }
}

export default GamesFeed;