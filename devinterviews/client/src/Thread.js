import React from 'react';
import Interview from './Interview.js'

export default function Thread (props) {

  const comments = props.comments.map((el, i)=>{
    return (
      <div key={i}>

      </div>
    )
  })

  return (
    <div>
    <Interview />
    {comments}
    </div>
  )
}
