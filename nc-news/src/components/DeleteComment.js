import React from 'react'


class CommentDeleter extends React.Component {

  handleClick = (event) => {
    event.preventDefault();
    this.props.deleteComment(this.props.id)
  }

  render() {
  return (
    <div>
      <form onClick ={this.handleClick} >
      <button>X</button>
      </form>
    </div>
  
  )
  }
}



export default CommentDeleter