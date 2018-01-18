import React from 'react';
import { Link } from 'react-router-dom';
import Voter from './Voter';
import changeVote from '../api';

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
          articleInfo: article
        })
      })

    fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}/comments`)

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

  updateVote = (id,vote) => {
    changeVote(id,vote)
    .then(res => {
      const updateVote = res;
      this.state.articleInfo.votes = updateVote.votes
      this.setState({
        articleInfo: updateVote
      })
    })
  }

  render() {

    const articleInfo = this.state
    return (
      <div>
        <h2>Article Page</h2>
        <div>
        <h3>{articleInfo.articleInfo.title}</h3>
        <p>{articleInfo.articleInfo.body}</p>
        <Link to={`/users/${articleInfo.articleInfo.created_by}`}>by {articleInfo.articleInfo.created_by} </Link>
        <Voter id = {articleInfo.articleInfo._id} votes= {articleInfo.articleInfo.votes} updateVote={this.updateVote} />
        <h3>Comments</h3>
        {this.state.comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.body}</p>
            <Link to={`/users/${comment.created_by}`}> Added by {comment.created_by} </Link>
            <p>likes {comment.votes}</p>
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