import React from 'react'

const Voter = ({ id, votes, updateVote }) => {


  const voteUp = () => updateVote(id, 'up')

  const voteDown = () => updateVote(id, 'down')

  return (
    <div className="likes">
      <p><i onClick={voteUp}> <i className="far fa-thumbs-up"></i></i> {votes}  <i onClick={voteDown}><i className="far fa-thumbs-down"></i></i></p>
    </div>

  )
}

export default Voter