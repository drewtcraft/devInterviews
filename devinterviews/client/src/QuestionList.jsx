import React from 'react';
import QuestionPost from './QuestionPost.js'

export default function QuestionList (props) {

  let questions

  //if user is logged in, get their past votes and apply highlighting to emoji
  if(props.votes) {
    let upVotes = props.votes.map((vEl) => {
      if(vEl.amount === 1 ){
        return vEl.type_id
      }
    })
    let downVotes = props.votes.map((vEl) => {
      if(vEl.amount === -1 ){
        return vEl.type_id
      }
    })

    questions = props.questions.map((el, i) => {
      let status = 'none'
      if (upVotes.includes(el.id)) { status = 'up' }
      else if (downVotes.includes(el.id)) { status = 'down' }
      return (<QuestionPost key={i} question={el} handleVote={props.handleVote}  voteStatus={status} />)
      })
  }

  else {
    questions = props.questions.map((el, i)=>{
      let status = 'none'
      return (<QuestionPost key={i} question={el} handleVote={props.handleVote}  voteStatus={status} />)
      })
  }

  return (
    <div className="section">
      <h2>Questions</h2>
      {questions}
    </div>
  )
}
