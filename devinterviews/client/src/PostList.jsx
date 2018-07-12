import React from 'react';
import Post from './Post.js'
import {Link} from 'react-router-dom'

export default function PostList (props) {
  let posts

  if(props.votes) {

    let upVotes = props.votes.map((vEl)=>{
      if(vEl.amount === 1 ){
        return vEl.type_id
      }
    })
    let downVotes = props.votes.map((vEl)=>{
      if(vEl.amount === -1 ){
        return vEl.type_id
      }
    })

    posts = props.posts.map((el, i)=>{

     let status = 'none'

     if (upVotes.includes(el.id)){
       status = 'up'
     } else if (downVotes.includes(el.id)){
       status = 'down'
     }
        return (<Post key={i} post={el} handleVote={props.handleVote}  voteStatus={status} />)
      })}

      else {

      posts = props.posts.map((el, i)=>{

       let status = 'none'

        return (<Post key={i} post={el} handleVote={props.handleVote}  voteStatus={status} />)
      })}

      let tags = (<div></div>)

      if(props.tags){
        tags = props.tags.map((el, i)=>{
          return(<Link to={{pathname: '/sorted/:id'}} className="tagLink">{el.name}</Link>)
        })
      }






  return (
    <div className="section">
    <h2 className='pageTitle'>All Interviews</h2>
      {/*<div className="tagLinksContainer">
        <p>popular tags:</p>
        {tags}
      </div>*/}
      {posts}
    </div>
  )
}
