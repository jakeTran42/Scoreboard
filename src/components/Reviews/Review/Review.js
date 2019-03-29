import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import { withRouter } from 'react-router';
import './Review.css'

const REVIEW_BY_ID_QUERY = gql`
    query ReviewQuery($filter: ID){
        gameReviewById(filter: $filter) {
        reviews {
            title
            content
            score
        }
    }
}
`

class Review extends Component {
    state = {  }
    render() {
        const vars = {filter: this.props.match.params.reviewId}
        return ( 
            <div className="reviewContainer">
                <div onClick={() => this.props.history.push('/reviews')} >Go back</div>
                <Query query={REVIEW_BY_ID_QUERY} variables={vars}>
                {({data, error, loading}) => 
                    {
                        if (loading) return <div className ="reviewLoaderWrapper"><div className="loader"></div></div>
                        if (error) return <div>Error</div>
                        const {title, content, score} = data.gameReviewById.reviews[0]
                        return (
                            <div>
                                <div>
                                    {title} | {content} | {score}
                                </div>
                            </div>
                        )
                    }
                }
            </Query>
            </div>
         );
    }
}
 
export default withRouter(Review);