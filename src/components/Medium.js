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
         );
    }
}
 
export default Medium;
