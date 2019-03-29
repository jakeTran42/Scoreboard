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
        
        const { id, name, coverId, collection, first_release_date, genres, platforms, summary, themes, total_rating, total_rating_count, involved_companies, category } = {...this.props.game}
        const date = new Date(first_release_date * 1000)
        const released_date = () => {
            var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            var day = date.getDate();
            var month = months[date.getMonth()];
            var year = date.getFullYear()
            return [month, day, year]
        }

        const tagMapper = (type, arr, cssName) => {
            if(arr.length > 0) {
                return  <div className={type.toLowerCase() + '-wrapper'}>
                            <h2>{type}</h2>
                            <div className="keywords-wrapper">
                                {arr.map((el) => <div key={el} id={cssName}>{el}</div>)}
                            </div>
                        </div>}
            return  <div className={type.toLowerCase() + '-wrapper'}>
                        <h2>{type}</h2>
                        <div className="keywords-wrapper">
                            <div id={cssName} style={{border: '1px solid red', color: 'red'}}>?????</div>
                        </div>
                    </div>
        }

        return ( 
            <div className="game-container">
                <i className="fas fa-window-close" onClick={this.props.goBackHandler} style={{fontSize: '2em'}}></i>
                <div className="game-data-wrapper">
                    <div className="left-display-wrapper">
                        <img id="source-img" src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverId}.jpg`} alt="N/A"/>
                        <div id="general-info-div">
                            <div className="circular-div">
                                <div className="rating-ct-wrapper"><h5 id="total-rating-ct">{total_rating_count}</h5><h5>Rating</h5> </div>
                                {/* <h5 id="total-rating-ct">{total_rating_count} Rating</h5> */}
                                <RatingBar containerWidth={'100px'} fillStyle={'#252331'}>{total_rating.toFixed(0)}</RatingBar>
                            </div>

                            <div 
                                id="dev-div"><b style={{color: '#ed3b4d'}}>Companies</b>
                                <div id="developers-list">
                                    {involved_companies.length > 0 
                                    ? (involved_companies.map((company) => 
                                        {   
                                            if(company.developer ===  true) return <div key={company.name} id="developers-wrapper" style={{color: '#4ee881'}}>{`< ${company.name} >`}</div>
                                            return <div key={company.name} id="developers-wrapper">{company.name}</div>
                                        }))
                                    : <div>N/A</div>}
                                </div>
                            </div>

                            <div id="released-date-div"><b style={{color: '#ed3b4d'}}>Released</b><div id="date-div-game">{released_date().map((e) => <div key={e}>{e}</div>)}</div></div>
                        </div>
                    </div>

                    <div className="right-display-wrapper">
                        <div className="catergory-name-wrapper">
                            <h1 id="body-name-tag">{name}</h1><div className={`catergory-tag ` + category}>{category}</div>
                        </div>
                        <div className="summary-tag">
                            <h2>Summary</h2><p>{summary.replace(/['"]+/g, '')}</p>
                        </div>
                        <div className="keywords-container">
                            {tagMapper('Genre', genres, 'genres-tag')}
                            {tagMapper('Theme', themes, 'themes-tag')}
                            {tagMapper('Platform', platforms, 'platforms-tag')}
                        </div>
                    </div>
    
                </div>
                <Link to={{pathname: '/create', state: {id: id, name: name}}} >Create a Review for this game</Link>
            </div>
         );
    }
}
 
export default withRouter(Game);