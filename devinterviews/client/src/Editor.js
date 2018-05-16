import React from 'react';

export default class Editor extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      editorText: ''
    }

    this.makePlain = this.makePlain.bind(this)
  }

  makePlain(){
    const start = this.refs.editor.selectionStart
    const end = this.refs.editor.selectionEnd

    const prevText = this.state.editorText
    const highlightedText = prevText.substring(start, end)
    console.log(highlightedText)
  }

  render(){
    return(
      <div>
      <button onClick={this.makePlain}>plain</button>
      <button>code</button>
      <div contentEditable={true}
        ref='editor'
        value={this.state.editorText}
        onChange={(e)=>{this.setState({editorText: e.target.value})}}
       ></div>
      </div>
    )
  }
}
