import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../AUTH/constants'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './CreateReview.css'

// Mutation constant for creating a review
const POST_REVIEW_MUTATION = gql`
  mutation ReviewMutation($igdbId: Int!, $igdbTitle: String!, $title: String!, $content: String!, $score: Int!) {
    postReview(igdbId: $igdbId, igdbTitle: $igdbTitle, title: $title, content: $content, score: $score) {
      id
      igdbId
      igdbTitle
      title
      content
      score
    }
  }
`

class CreateReview extends Component {
    state = {
        title: '',
        content: '',
        score: ''
     }

    render() {
        // console.log(this.state.score)
        
        // Redirect User to Login page if auth not confirmed
        const token = localStorage.getItem(AUTH_TOKEN)
        if(!token) this.props.history.push('/login')

        // If this component did not recieve a game prop then redirect user to search for a game 
        // if(!this.props.game) return <Link to="/game/search" > Please Find a game to review </Link>
        if(!this.props.game) return <Link className="no-game-selection" to="/game/search"> Please Find a game to review </Link>

        const vars = {igdbId: Number(this.props.game.id), igdbTitle: this.props.game.name, ...this.state, score: Number(this.state.score)}
        return ( 
            <div className="review-form-container">
                {/* <div onClick={() => this.props.history.goBack()}>Find another game instead</div> */}
                <div className="review-form">

                    <div className="submit-game-title">
                        <span style={{color: "#f4426b"}}>{this.props.game.name}</span>
                        <div id="search-game-btn" onClick={() => this.props.history.goBack()}>Find another game instead</div>
                    </div>

                    <span>Title</span>
                    <input className="review-title-input" value={this.state.title} 
                    onChange={e => this.setState({title: e.target.value})} 
                    type="text" placeholder="The title for the review" />

                    <span>Content</span>
                    <textarea className="review-content-input" value={this.state.content} 
                    rows="5" cols="80"
                    onChange={e => this.setState({content: e.target.value})} 
                    type="text" placeholder="The content for the review" />

                    <input 
                    className="review-score-input" value={this.state.score} 
                    onChange={e => this.setState({score: e.target.value})} 
                    type="number" placeholder="Score out of 10" />

                </div>

                {/* Wrap the button element as render prop function result with <Mutation /> component passing POST_REVIEW_MUTATION as prop.*/}
                <Mutation mutation={POST_REVIEW_MUTATION} variables={vars} onCompleted={(data) => this.props.history.push({pathname: `/review/${data.postReview.id}`, state: {...data}})}>
                    {(reviewMutation) => (
                        // call the function that Apollo injects into <Mutation /> component’s render prop function inside onClick button’s event
                        this.checkBlankField() 
                        ? <div class="submit-btn" onClick={reviewMutation}>Submit</div> 
                        : <div class="blank-warning">You still have some blank space!</div>
                    )}
                </Mutation>
            </div>
         );
    }

    // Checking if any field is Blank
    checkBlankField() {
        return (this.state.title && this.state.content && this.state.score) ? true : false
    }
}
 
export default withRouter(CreateReview);