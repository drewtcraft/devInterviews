import React from 'react';
import ReactDOM from 'react-dom';
import {RichUtils, Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js';

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'code-block') {
    return 'superFancyBlockquote';
  }
}

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      this.setState({editorState})
        props.onChange()
    };
  }
s
  componentDidMount(){
    if(this.props.content !== undefined){
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content).data))
      })
    }
  }



  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState))
  }

  render() {
    if(this.props.editing){
      let button = (<div className='button' onClick={this.onToggleCode}>toggle code block</div>)


    return (
      <div className='codeEditor'>
        {button}
        <Editor readOnly={this.props.readOnly} blockStyleFn={myBlockStyleFn}
          editorState={this.state.editorState} onChange={this.onChange} />

        </div>
    )
  }
    else {

    let button = (<div></div>)

    if(this.props.content === undefined){
      button = (<div className='button' onClick={this.onToggleCode}>toggle code block</div>)
    }

    return (
      <div className={this.props.content !== undefined ? ' contentFul' : 'codeEditor'}>
        {button}
        <Editor readOnly={this.props.readOnly} blockStyleFn={myBlockStyleFn}
          editorState={this.state.editorState} onChange={this.onChange} />

        </div>
    )
  }
  }
}
