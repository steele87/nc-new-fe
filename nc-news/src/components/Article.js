import React from 'react';
import { Link } from 'react-router-dom';
import Voter from './Voter';
import CommentVoter from './CommentVoter';
import changeVote from '../api';
import changeCommentVote from '../commentVoteApi';
import CommentAdder from './CommentAdder';
import postComment from '../commentAdderApi';
import deleteRequest from '../deleteCommentApi'
import CommentDeleter from './DeleteComment'

class Article extends React.Component {
  state = {
    articleInfo: {},
    comments: [],
  }

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}`)
      .then((res) => {
        return res.json();
      })
      .then((article) => {
        this.setState({
          articleInfo: article.article
        })
      })

    fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}/comments`)
      .then((commentInfo) => {
        return commentInfo.json();
      })
      .then((comment) => {
        const commentList = comment.comments
        commentList.sort(function (a, b) {
          return a.votes < b.votes;
        });
        this.setState({
          comments: commentList
        })
      })
  }

  addComment = (id, event) => {
    event.preventDefault()
    postComment(id, event.target[0].value)
      .then(res => {
        if (res.status === 201) {
          fetch(`${process.env.REACT_APP_API_URL}/articles/${this.state.articleInfo._id}/comments`)
            .then((commentInfo) => {
              return commentInfo.json();
            })
            .then((comment) => {
              const commentList = comment.comments
              this.setState({
                comments: commentList
              })
            })
        }
      })
  }

  deleteComment = (id) => {
    deleteRequest(id)
    const refreshedComments = this.state.comments.filter((comment) => {
      if (comment._id !== id) return comment
    })
    this.setState({
      comments: refreshedComments
    })
  }

  updateVote = (id, vote) => {
    changeVote(id, vote)
      .then(res => {
        this.setState({
          articleInfo: res.article
        })
      })
  }

  commentVote = (id, vote) => {
    changeCommentVote(id, vote)
      .then(commentThings => {
        if (commentThings.status === 200) {
          fetch(`${process.env.REACT_APP_API_URL}/articles/${this.state.articleInfo._id}/comments`)
            .then((commentInfo) => {
              return commentInfo.json();
            })
            .then((comment) => {
              const commentList = comment.comments
              this.setState({
                comments: commentList
              })
            })
        }
      });
  };


  render() {
    const articleInfo = this.state;
    return (
      <div>
        <h2><i className="far fa-bookmark"></i> Article Page</h2>
        <div>
          <h3>Article: {articleInfo.articleInfo.title}</h3>
          <p>{articleInfo.articleInfo.body}</p>
          {/* <Link className="link" to={`/users/${articleInfo.articleInfo.created_by}`}>by {articleInfo.articleInfo.created_by} </Link> */}
          <Voter id={articleInfo.articleInfo._id} votes={articleInfo.articleInfo.votes} updateVote={this.updateVote} />
          <hr />
          <h4><i className="fas fa-comments"></i> Comments:</h4>
          <CommentAdder id={articleInfo.articleInfo._id} addComment={this.addComment} />
          {this.state.comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.body}</p>
              <Link className="link" to={`/users/${comment.created_by}`}> Added by {comment.created_by} </Link>
              <CommentVoter id={comment._id} votes={comment.votes} commentVote={this.commentVote} />
              <CommentDeleter id={comment._id} deleteComment={this.deleteComment} />
              <hr />
            </div>
          )
          )}
        </div>
      </div>
    )
  }
}

export default Article