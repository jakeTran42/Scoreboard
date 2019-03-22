import React, { Component } from 'react';

class Review extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div>
                {this.props.review.title} | {this.props.review.content} | {this.props.review.score}
                </div>
            </div>
         );
    }
}
 
export default Review;