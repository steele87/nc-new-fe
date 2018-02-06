import React from 'react'

const CommentAdder = ({id, addComment,}) => {

  return (
    <div>
      <form onSubmit ={(event) => addComment(id, event)} >
      <input type="text" name="comment" placeholder="add comment" size="100"></input>
      <input type="submit" vaulue="Add" />
      </form>
    </div>

  )
}

export default CommentAdder