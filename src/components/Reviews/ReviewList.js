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
        }
    }
}
`
class ReviewList extends Component {
    state = {}
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
                                <div>
                                    {reviewsToRender.map((review) => <div key={review.id} onClick={() => this.props.history.push(`/review/${review.id}`)}>
                                        {review.id} | {review.title} | {review.content} | {review.score}
                                    </div>)}
                                </div>
                            )
                        }
                    }
                </Query>}
            </div> 
         );
    }
}
 
export default ReviewList;
