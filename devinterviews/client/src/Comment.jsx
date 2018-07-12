import React from 'react';
import Voter from './Voter.jsx'
import CodeEditor from './CodeEditor.jsx'
import {convertToRaw} from 'draft-js'


export default function Comment (props) {

  return (
    <div className='comment'>
      <div className='info'>
      <p>posted by <span className='bold'>{props.user}</span> at {props.date}</p>
      {/* <CodeEditor readOnly={true} content={props.title} type="text" /> */}
      <CodeEditor readOnly={true} content={props.content} type="text" />
      </div>
      <Voter type={props.type} handleVote={props.handleVote} id={props.id} score={props.score} voteStatus={props.voteStatus} />
    </div>
  )
}
