import React from 'react'

const CommentAdder = ({ id, addComment, }) => {

  return (
    <div className="commentBox">
      <form onSubmit={(event) => addComment(id, event)} >
        <input type="text" className="commentBox" name="comment" placeholder="add comment"></input>
        <p> <i className="fas fa-plus link"></i> <input type="submit" value="Submit comment!" className="addButton" />  </p>
      </form>
    </div>

  )
}

export default CommentAdder