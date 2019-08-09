import React, { Component } from 'react';
import './GamesFeed.css';
import Game from '../Game/Game';
import { Link } from 'react-router-dom';
import RatingBar from '../VisualComponents/RatingBar';

const urlMapper = (websites) => {
    // website map {1: 'official', 2: 'wikia', 13: 'steam', 14: 'reddit', 15: 'discord'}
    if(websites.length > 0) {
        const externaLinks = websites.map((site) => {
            var url;
            switch (site.category) {
                case 1:
                    url = <a key={site.category} href={site.url} target="_blank" rel="noopener noreferrer"><i className="fas fa-info-circle"></i></a>
                    break
                case 2:
                    url = <a key={site.category} href={site.url} target="_blank" rel="noopener noreferrer"><i className="fab fa-wikipedia-w"></i></a>
                    break
                case 13:
                    url = <a key={site.category} href={site.url} target="_blank" rel="noopener noreferrer"><i className="fab fa-steam-square"></i></a>
                    break
                case 14:
                    url = <a key={site.category} href={site.url} target="_blank" rel="noopener noreferrer"><i className="fab fa-reddit-square"></i></a>
                    break
                case 15:
                    url = <a key={site.category} href={site.url} target="_blank"rel="noopener noreferrer"><i className="fab fa-discord"></i></a>
                    break
                default:
                    break
            }
            return url
        })
        return (
            <div className='externalLinks-wrapper'>
                {externaLinks.map((link) => link)}
            </div>
        )
    }
}

const extraContentDisplay = (type, content) => {
    return (
        <div className="extra-content-wrapper">
            {(content.length < 1) 
            ? <div id="extra-content-data">This game have no {type} in our database</div> 
            : content.map((el) => <div key={el.id} id="extra-content-data">{el.name}</div>)}
        </div>
    )
}

class GamesFeed extends Component {
    constructor(props) {
        super(props);
        this.state = { gameMetaData: null };
        this.goBackHandler = this.goBackHandler.bind(this)
    }

    goBackHandler(){
        this.setState({ gameMetaData: null })
    }

    checkNSFW(arr) {
        if (arr) {
            return arr.includes("Erotic")
        }
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
                        <div id="mode-tags">{game.game_modes.map((mode) => <div id="tag" key={mode.slug}>{mode.name}</div>)}</div>
                        <div id="theme-tags">{game.themes.map((theme) => <div id="tag" key={theme}>{theme}</div>)}</div>
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