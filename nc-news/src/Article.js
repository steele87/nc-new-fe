import React from 'react';
import { Link } from 'react-router-dom';

class Article extends React.Component {
  state = {
    articleInfo: {},
    comments: [],
  }

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}`)
      .then((res) => {
        return res.json();
      })
      .then((article) => {
        this.setState({
          articleInfo: article
        })
      })
    // .then((articleInfo) => {
    fetch(`https://northcoders-news-api.herokuapp.com/api/articles/${articleId}/comments`)
      // })
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

  render() {
    const articleInfo = this.state
    return (
      <div>
        <h2>Article Page</h2>
        <h3>{articleInfo.articleInfo.title}</h3>
        <p>{articleInfo.articleInfo.body}</p>
        <Link to={`/users/${articleInfo.articleInfo.created_by}`}>by {articleInfo.articleInfo.created_by} </Link>
        <p>likes: {articleInfo.articleInfo.votes}</p>
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
    )
  }
}

export default Article