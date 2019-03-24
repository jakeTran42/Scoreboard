import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../AUTH/constants'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
        
        // Redirect User to Login page if auth not confirmed
        const token = localStorage.getItem(AUTH_TOKEN)
        if(!token) this.props.history.push('/login')

        // If this component did not recieve a game prop then redirect user to search for a game 
        if(!this.props.game) return <Link to="/game/search" > Please Find a game to review </Link>

        const vars = {igdbId: Number(this.props.game.id), igdbTitle: this.props.game.name, ...this.state, score: Number(this.state.score)}
        return ( 
            <div>
                <div className="flex flex-column mt3">

                    <input className="mb2" value={this.state.title} 
                    onChange={e => this.setState({title: e.target.value})} 
                    type="text" placeholder="The title for the review" />

                    <input className="mb2" value={this.state.content} 
                    onChange={e => this.setState({content: e.target.value})} 
                    type="text" placeholder="The content for the review" />

                    <input 
                    className="mb2" value={this.state.score} 
                    onChange={e => this.setState({score: e.target.value})} 
                    type="number" placeholder="The score for the review" />
                </div>

                {/* Wrap the button element as render prop function result with <Mutation /> component passing POST_REVIEW_MUTATION as prop.*/}
                <Mutation mutation={POST_REVIEW_MUTATION} variables={vars} onCompleted={(data) => this.props.history.push({pathname: `/review/${data.postReview.id}`, state: {...data}})}>
                    {(reviewMutation) => (
                        // call the function that Apollo injects into <Mutation /> component’s render prop function inside onClick button’s event
                        this.checkBlankField() 
                        ? <button onClick={reviewMutation}>Submit</button> 
                        : <div>Chu have blank fields!</div>
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