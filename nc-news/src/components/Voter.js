import React from 'react'

const Voter = ({ id, votes, updateVote }) => {


  const voteUp = () => updateVote(id, 'up')

  const voteDown = () => updateVote(id, 'down')

  return (
    <div>
      <i onClick={voteUp}>^</i>
      <p>{votes}</p>
      <i onClick={voteDown}>v</i>
    </div>

  )
}

export default Voter