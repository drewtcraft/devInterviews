import React from 'react';
import {Link} from 'react-router-dom'
import Voter from './Voter.jsx';

export default function Post (props) {

  const post = props.post
  const title = post.summary.length < 120 ? post.summary : `${post.summary.slice(0, 120)}...`

  return (
    <div className="post pageTitle">
      <Link to={{pathname: `/interview/${post.id}`}} className="link">
      <div className="info">
      <h2>{post.title}</h2>
      <h4>posted by {post.username}</h4>
      <p>{title}</p>
      </div>

      </Link>
      <Voter type={'i'} handleVote={props.handleVote} id={post.id} score={post.score} voteStatus={props.voteStatus} />

    </div>
  )
}
