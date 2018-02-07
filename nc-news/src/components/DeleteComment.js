import React from 'react'


class CommentDeleter extends React.Component {

  handleClick = (event) => {
    event.preventDefault();
    this.props.deleteComment(this.props.id)
  }

  render() {
    return (
      <div className="likes">
        <form onClick={this.handleClick} >
          <p><button><i className="far fa-trash-alt"></i> </button>  Delete!</p>
        </form>
      </div>

    )
  }
}



export default CommentDeleter