import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import { withRouter } from 'react-router';
import './Review.css'

const REVIEW_BY_ID_QUERY = gql`
    query ReviewQuery($filter: ID){
        gameReviewById(filter: $filter) {
        reviews {
            id
            title
            content
            score
            igdbId
            igdbTitle
            postedBy {
                username
            }
        }
    }
}
`

class Review extends Component {
    state = {  }

    reviewDisplay = (review) => {
        return(
            <div className="reviewByID-wrapper">
                <span id="reviewByID-title">{review.title}</span>
                <span id="reviewByID-gameTitle">This review is for <span style={{color: "#f4426b"}}>{review.igdbTitle}</span></span>
                <span id="reviewByID-content">{review.content}</span>
                <span class="reviewByID-user"> 
                    <span id="review-by-username">
                        <span style={{color: "#f4426b"}}>Posted By •</span> &nbsp;
                        <span>{review.postedBy.username}</span>
                    </span> 
                    <span id="reviewer-score">
                        <span style={{color: "#f4426b"}}>Score Given •</span> &nbsp;
                        <span>{review.score}/10</span> 
                    </span>
                </span>
            </div>
        )
    }

    render() {
        const vars = {filter: this.props.match.params.reviewId}
        return ( 
            <div className="reviewContainer">
                {/* <div onClick={() => this.props.history.push('/reviews')} >Go back</div> */}
                <Query query={REVIEW_BY_ID_QUERY} variables={vars}>
                    {({data, error, loading}) => 
                        {
                            if (loading) return <div className ="reviewLoaderWrapper"><div className="loader"></div></div>
                            if (error) return <div>Error</div>
                            // const {igdbTitle, title, content, score} = data.gameReviewById.reviews[0]
                            const reviewByID = data.gameReviewById.reviews[0]
                            console.log(reviewByID)
                            return (
                                this.reviewDisplay(reviewByID)
                            )
                        }
                    }
                </Query>
            </div>
         );
    }
}
 
export default withRouter(Review);