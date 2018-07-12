import React from 'react';
import CodeEditor from './CodeEditor.jsx'
import {convertToRaw} from 'draft-js'

export default class extends React.Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render(){
    return(
      <div className='commentForm'>
        <h2>Add Comment</h2>
        <form onSubmit={(e)=>{

          this.props.postComment(
            {type: this.props.type,
              comment: {
              type_id: this.props.object.id,
              user_id: this.props.user.user_id,
              username: this.props.user.username,
              title: 'no title',
              content: JSON.stringify({data: convertToRaw(this.content.state.editorState.getCurrentContent())})
        }}, e)


      }}>
        {/*<CodeEditor readOnly={false} content ={undefined} type="text" ref={(ref)=>{this.title = ref}} onChange={()=>{}} />*/}
        <CodeEditor readOnly={false} content ={undefined} type="text" ref={(ref)=>{this.content = ref}} onChange={()=>{}} />
        <button type="Submit">Post Comment</button>
        </form>
      </div>
    )
  }
}
