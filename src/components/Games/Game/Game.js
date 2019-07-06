import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Game.css'
import '../VisualComponents/RatingBar';
import RatingBar from '../VisualComponents/RatingBar';
import Gallery from './ScreenshotGallery'

const released_date = (date) => {
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





class Game extends Component {
    state = { 
        currentContentDisplay: 'DLC',
        extraContentData: this.props.game.dlcs,
     }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    contentToDisplay = (dlcs, expansions, bundles) => {
        const contentNames = <div className="content-names">
            <div className={'xtra' + (this.state.currentContentDisplay === 'DLC' ? ' dlc-sel' : '')} onClick={() => this.setState({currentContentDisplay: 'DLC', extraContentData: dlcs})}>DLC</div>
            <div className={'xtra' + (this.state.currentContentDisplay === 'Expansion' ? ' expansion-sel' : '')} onClick={() => this.setState({currentContentDisplay: 'Expansion', extraContentData: expansions})}>Expansion</div>
        </div>
        return contentNames
    }

    render() {

        if(!this.props.game) return <div>{this.props.history.push('/404')}</div>
        
        const { id, name, coverId, collection, first_release_date, genres, platforms, summary, themes, total_rating, total_rating_count, involved_companies, category, websites, dlcs, expansions, screenshots } = {...this.props.game}
        const releaseDate_parsed = new Date(first_release_date * 1000)

        return ( 
            <div className="game-container">
                <div onClick={this.props.goBackHandler} className='close-div'><i className="fas fa-window-close" style={{fontSize: '2em'}}></i></div>
                <div className="game-data-wrapper">
                    <div className="left-display-wrapper">
                        <img id="source-img" src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverId}.jpg`} alt="N/A"/>
                        <div id="general-info-div">
                            <div className="circular-div">
                                <div className="rating-ct-wrapper"><h5 id="total-rating-ct">{total_rating_count > 0 ? total_rating_count : '?'}</h5><h5>Rating</h5> </div>
                                <RatingBar containerWidth={'100px'} fillStyle={'#202121'}>{total_rating ? total_rating.toFixed(0) : 0}</RatingBar>
                            </div>

                            <div 
                                id="dev-div"><b style={{color: '#ed3b4d'}}>Companies</b>
                                <div id="developers-list">
                                    {involved_companies.length > 0 
                                    ? (involved_companies.map((company) => 
                                        {   
                                            if(company.developer ===  true) {
                                                return (
                                                    <div key={company.name} id="developers-wrapper" style={{color: '#4ee881'}}>
                                                        {company.name}<i className="fab fa-dev"></i>
                                                    </div>)}
                                            return <div key={company.name} id="developers-wrapper">{company.name}</div>
                                        }))
                                    : <div id="developers-wrapper">N/A</div>}
                                </div>
                            </div>

                            <div id="released-date-div"><b style={{color: '#ed3b4d'}}>Released</b>
                                <div id="date-div-game">{released_date(releaseDate_parsed).map((e) => <div key={e}>{e}</div>)}</div>
                            </div>
                        </div>
                        {urlMapper(websites)}
                    </div>

                    <div className="right-display-wrapper">
                        <div className="catergory-name-wrapper">
                            <h1 id="body-name-tag">{name}</h1><div className={`catergory-tag ` + category}>{category}</div>
                        </div>
                        <div className="summary-tag">
                            <h2>Summary</h2><p>{summary ? summary.replace(/['"]+/g, '') : 'No Summary'}</p>
                        </div>
                        {collection ? <div id="collection-tag">From the <span style={{color: '#ed3b4d', fontWeight: '500'}}>{collection}</span> collection</div> : ''}
                        <div className="links-wrapper">
                            <Link id='view-review-link' to={{pathname: '/create', state: {id: id, name: name}}}><i className="fas fa-pen-square"></i> View Review <i className="fas fa-arrow-right"></i></Link>
                            <Link id='create-review-link' to={{pathname: '/create', state: {id: id, name: name}}}><i className="fas fa-folder"></i> Create Review <i className="fas fa-arrow-right"></i></Link>
                            <Link id='create-review-link' to={{pathname: '/create', state: {id: id, name: name}}}><i className="fas fa-gamepad"></i> Create Guide <i className="fas fa-arrow-right"></i></Link>
                            <Link id='create-review-link' to={{pathname: '/create', state: {id: id, name: name}}}><i className="fas fa-folder"></i> View Guide <i className="fas fa-arrow-right"></i></Link>
                        </div>
                        <div className="keywords-container">
                            {tagMapper('Genre', genres, 'genres-tag')}
                            {tagMapper('Theme', themes, 'themes-tag')}
                            {tagMapper('Platform', platforms, 'platforms-tag')}
                        </div>
                        
                        <div className="extra-content-container">
                            {this.contentToDisplay(dlcs, expansions)}
                            {extraContentDisplay(this.state.currentContentDisplay, this.state.extraContentData)}
                        </div>                           
                        
                    </div>
    
                </div>
                <div className="screenshot-carousel" style={{background: '#202121'}}>
                    <div id="screenshot-title">
                        SCREENSHOTS
                    </div>
                    {screenshots && (<Gallery images={screenshots} />)}
                </div>
            </div>
         );
    }
}
 
export default withRouter(Game);