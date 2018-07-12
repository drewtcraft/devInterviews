import React from 'react';
import Comment from './Comment.jsx'
import CommentForm from './CommentForm.jsx'
import {Link} from 'react-router-dom'
import CodeEditor from './CodeEditor.jsx'


export default function QuestionDetail (props) {

  let question = (<div></div>)

  if(props.question){
    let editButton = (<div></div>)
    if(props.user.username === props.question.username){
      editButton = (<Link to={{pathname: `/qDetail/${props.question.id}/edit`}}>edit question</Link>)
    }
    question = (<div className='oneQuestion'>
    <CodeEditor readOnly={true} content={props.question.title} type="text" />
    <CodeEditor readOnly={true} content={props.question.content} type="text" />
    {editButton}

    <Link to={{pathname:`/interview/${question.interview_id}`}}>See full interview</Link>

    </div>)
  }

  let comments = (<div>no comments to display</div>)

if(props.comments){

  if(props.votes) {

    let upVotes = props.votes.map((vEl)=>{
      if(vEl.amount === 1 ){
        console.log('fucking upvote')
        return vEl.type_id
      }
    })
    let downVotes = props.votes.map((vEl)=>{
      if(vEl.amount === -1 ){
        return vEl.type_id
      }
    })

   comments = props.comments.map((el, i)=>{

     let status = 'none'

     if (upVotes.includes(el.id)){
       status = 'up'
     } else if (downVotes.includes(el.id)){
       status = 'down'
     }

    return (
      <Comment type={'qc'} key={i} title={el.title} content={el.content} user={el.username} date={el.post_date}
        handleVote={props.handleVote} id={el.id} score={el.score} voteStatus={status} />
    )
  })}

  else {

    comments = props.comments.map((el, i)=>{

      let status = 'none'

     return (
       <Comment key={i} title={el.title} content={el.content} user={el.username} date={el.post_date}
         handleVote={props.handleVote} id={el.id} score={el.score} voteStatus={status} />
     )
   })
  }


}

return (
  <div className='thread'>
  {question}
  <h2>Comments</h2>
  {comments}
  <CommentForm type={'q'} postComment={props.postComment} object={props.question} user={props.user} />
  </div>
)


}
