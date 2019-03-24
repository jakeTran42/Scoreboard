import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// Components import
import Review from './Review/Review'

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
            <Query query={REVIEW_QUERY}>
                {({data, error, loading}) => 
                    {
                        if (loading) return <div>Fetching</div>
                        if (error) return <div>Error</div>
                        const reviewsToRender = data.gameReviews.reviews
                        return (
                            <div>
                                {reviewsToRender.map(review => <Review key={review.id} review={review} />)}
                            </div>
                        )
                    }
                }
            </Query>
         );
    }
}
 
export default ReviewList;