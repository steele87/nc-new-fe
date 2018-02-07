import React from 'react'

const CommentAdder = ({ id, addComment, }) => {

  return (
    <div className="commentBox">
      <form onSubmit={(event) => addComment(id, event)} >
        <input type="text" className="commentBox" name="comment" placeholder="add comment"></input>
        <p> <i class="fas fa-plus"></i> <input type="submit" value="Submit comment!" className="addButton" />  </p>
      </form>
    </div>

  )
}

export default CommentAdder