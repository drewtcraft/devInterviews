import React from 'react';
import Interview from './Interview.jsx'
import Comment from './Comment.jsx'
import CommentForm from './CommentForm.jsx'

export default function Thread (props) {

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
        <Comment key={i} title={el.title} type={'c'} content={el.content} user={el.username} date={el.post_date}
          handleVote={props.handleVote} id={el.id} score={el.score} voteStatus={status} />
      )
    })}

    else {

      comments = props.comments.map((el, i)=>{

        let status = 'none'

       return (
         <Comment key={i} type={'c'} title={el.title} content={el.content} user={el.username} date={el.post_date}
           handleVote={props.handleVote} id={el.id} score={el.score} voteStatus={status} />
       )
     })
    }


  }
  console.log('thread is up player')

  return (
    <div className='thread'>
      <Interview delete={props.delete} user={props.user} interview={props.interview} tags={props.tags} questions={props.questions} handleVote={props.handleVote}  />
      <h2 className="pageTitle">Comments</h2>
      {comments}
      <CommentForm  postComment={props.postComment} type={'i'} object={props.interview} user={props.user} />
    </div>
  )


}
