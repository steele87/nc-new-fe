import React from 'react';
import { Link } from 'react-router-dom';
import Voter from './Voter';
import CommentVoter from './CommentVoter';
import changeVote from '../api';
import changeCommentVote from '../commentVoteApi';
import CommentAdder from './CommentAdder';
import postComment from '../commentAdderApi';
import deleteRequest from '../deleteCommentApi';
import CommentDeleter from './DeleteComment';
import moment from 'moment';

class Article extends React.Component {
  state = {
    articleInfo: [],
    comments: [],
    hidden: false,
  }

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}`)
      .then((res) => {
        return res.json();
      })
      .then((article) => {
        let returnedArticle = [{}];
        if (!article.message) {
          return returnedArticle = article.article;
        } else return returnedArticle;
      })
      .then((articleInfo) => {
        this.setState({
          articleInfo: articleInfo
        });
      });
        

    fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}/comments`)
      .then((commentInfo) => {
        return commentInfo.json();
      })
      .then((comment) => {
        let commentList = []
        if (!comment.message) {
          commentList = comment.comments
        commentList.sort(function (a, b) {
          return b.votes - a.votes;
        });
      } return commentList;
    })
    .then((commentList) => {
      this.setState({
        comments: commentList,
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
      if (comment._id !== id) {return comment}
      return comment
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
              commentList.sort(function (a, b) {
                return b.votes - a.votes;
              });
              this.setState({
                comments: commentList
              })
            })
        }
      });
  };


  render() {
    const articleInfo = this.state.articleInfo;
    return (
      <div>
        <h2><i className="far fa-bookmark"></i> Article Page</h2>
        <div>
          {!articleInfo.length?
          <div>
          <h3>Article: {articleInfo.title}</h3>
          <p>{articleInfo.body}</p>
          <Link className="link" to={`/users/${articleInfo.created_by}`}>by {articleInfo.created_by} </Link>
          <Voter id={articleInfo._id} votes={articleInfo.votes} updateVote={this.updateVote} />
          <hr />
          <h4><i className="fas fa-comments"></i> Comments: {this.state.comments.length}</h4>
          <CommentAdder id={articleInfo._id} addComment={this.addComment} />
          </div>
          : <div className="frownFace"><i className="far fa-frown fa-lg " style={{ color: 'tomato' }} aria-hidden="true"></i><p>Sorry, article does not exist!</p></div> }
          {this.state.comments.map((comment, index) => (
            <div key={index}>
              <p><i className="fas fa-comments"></i> {comment.body}</p>
              <Link className="link" to={`/users/${comment.created_by}`}> <i className="fas fa-user"></i> Added by {comment.created_by} </Link>
              <CommentVoter id={comment._id} votes={comment.votes} commentVote={this.commentVote} />
              {comment.created_by === 'northcoder' ?
                <CommentDeleter id={comment._id} deleteComment={this.deleteComment} />
                : <p></p>}
              <p><i class="far fa-clock"></i> {moment(comment.created_at).fromNow()}  </p>
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