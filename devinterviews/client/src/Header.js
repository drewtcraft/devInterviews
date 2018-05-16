import React from 'react';

export default function Header (props) {
  
  const headerButtons = props.user ? (<a>profile</a>) : (<a>log in</a>)

  return (
    <div className="header">
      <h1 className="headerText">devInterviews</h1>
      {headerButtons}
    </div>
  )
}
