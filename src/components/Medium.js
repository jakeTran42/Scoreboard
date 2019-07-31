import React, { Component } from 'react';

import {
    Editor,
    createEditorState,
  } from 'medium-draft';

class Medium extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: createEditorState(), // for empty content
        };
        this.onChange = (editorState) => {
            this.setState({ editorState });
        };
        this.refsEditor = React.createRef();
    }

    componentDidMount() {
        this.refsEditor.current.focus();
      }

    render() {

        console.log(this.state.editorState)
        const { editorState } = this.state;

        return ( 
            <div>
                <h1>
                    <input
                    placeholder="Title" />
                </h1>
                <Editor
                ref={this.refsEditor}
                editorState={editorState}
                onChange={this.onChange}
                sideButtons={[]} />
                
            </div>
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
         );
    }
}
 
export default Medium;
