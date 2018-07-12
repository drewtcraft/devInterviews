import React from 'react';
import {Link} from 'react-router-dom'
import Voter from './Voter.jsx';
import CodeEditor from './CodeEditor.jsx'

export default function QuestionPost (props) {

  const question = props.question

  return (
    <div className="post">
      <Link to={{pathname: `/qDetail/${question.id}`}} className="link">
      <div className="info">
      <CodeEditor readOnly={true} content={question.title} type="text" />
      <CodeEditor readOnly={true} content={question.content} type="text" />

      </div>

      </Link>
      <Voter type={'q'} handleVote={props.handleVote} id={question.id} score={question.score} voteStatus={props.voteStatus} />

    </div>
  )
}
