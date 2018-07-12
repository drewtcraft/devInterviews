import React from 'react';
import Voter from './Voter.jsx';
import {Link} from 'react-router-dom'
import CodeEditor from './CodeEditor.jsx'

export default function Question (props) {

  return (
    <div className='question'>
      <div className='info'>
        <p className="label">question</p>
        <CodeEditor readOnly={true} content={props.title} type="text" className="questionField" />
        <p className="label">given answer</p>
        <CodeEditor readOnly={true} content={props.content} type="text" className="answerField" />

        {/*<Link to={{pathname:`/qDetail/${props.id}`}} className="questionLink">comments on question</Link>*/}

      </div>
    </div>
  )
}
