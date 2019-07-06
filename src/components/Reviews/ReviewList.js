import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './ReviewList.css'

const REVIEW_QUERY = gql`
{
    gameReviews {
        reviews {
            id
            title
            content
            score
            postedBy {
                username
            }
            igdbTitle
        }
    }
}
`
class ReviewList extends Component {
    // state = {}

    displayReview = (review) => {
        return(
            <div className="review-wrapper">
                <div className="title-preview">
                    <div id="game-title" style={{color: "#f4426b"}}>{review.igdbTitle}</div>
                    <div id="review-title">
                        {review.title}
                    </div>
                </div>
                <div className="review-preview">
                   <div id="review-username">
                       <span style={{color: "#f4426b"}}>Posted By </span>
                       <span> &nbsp; • {review.postedBy.username}</span>
                   </div>
                   <div id="review-score">
                       <div style={{color: "#f4426b"}}>User Score</div>
                       <div> &nbsp; • {review.score}/10</div>
                   </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="reviewListContainer">
                <Query query={REVIEW_QUERY}>
                    {({data, error, loading}) => 
                        {
                            if (loading) return <div className="reviewListLoaderWrapper"><div className="loader"></div></div>
                            if (error) return <div>Error</div>
                            const reviewsToRender = data.gameReviews.reviews
                            return (
                                <div className="reviews-container">
                                    {reviewsToRender.map((review) => <div key={review.id} onClick={() => this.props.history.push(`/review/${review.id}`)}>
                                        {console.log(review)}
                                        {this.displayReview(review)}
                                    </div>)}
                                </div>
                            )
                        }
                    }
                </Query>
            </div> 
         );
    }
}
 
export default ReviewList;
