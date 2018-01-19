import React from 'react'

const CommentVoter = ({ id, votes, commentVote }) => {


  const voteUp = () => commentVote(id, 'up');

  const voteDown = () => commentVote(id, 'down');

  return (
    <div>
      <i onClick={voteUp}>^</i>
      <p>{votes}</p>
      <i onClick={voteDown}>v</i>
    </div>

  )
}

export default CommentVoter