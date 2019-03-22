import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// Mutation constant for creating a review
const POST_REVIEW_MUTATION = gql`
  mutation ReviewMutation($igdbId: Int!, $igdbTitle: String!, $title: String!, $content: String!, $score: Int!) {
    postReview(igdbId: $igdbId, igdbTitle: $igdbTitle, title: $title, content: $content, score: $score) {
      id
      igdbId
      igdbTitle
      content
      score
    }
  }
`

class CreateReview extends Component {
    state = {
        igdbId: '',
        igdbTitle: '',
        title: '',
        content: '',
        score: ''
     }
    render() {
        // const { igdbId, igdbTitle, title, content, score } = this.state
        const vars = {...this.state, score: Number(this.state.score), igdbId: Number(this.state.igdbId)}
        return ( 
            <div>
                <div className="flex flex-column mt3">
                    <input 
                    className="mb2" value={this.state.igdbId} 
                    onChange={e => this.setState({igdbId: e.target.value})} 
                    type="number" placeholder="A igdbid for the review" />

                    <input 
                    className="mb2" value={this.state.igdbTitle} 
                    onChange={e => this.setState({igdbTitle: e.target.value})} 
                    type="text" placeholder="The igdbTitle for the review" />

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
                <Mutation mutation={POST_REVIEW_MUTATION} variables={vars} onCompleted={(data) => this.props.history.push({pathname: `/review/${data.postReview.id}`, state: {data: {...data}}})}>
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
        return (this.state.igdbId && this.state.igdbTitle && this.state.title && this.state.content && this.state.score) ? true : false
    }
}
 
export default CreateReview;