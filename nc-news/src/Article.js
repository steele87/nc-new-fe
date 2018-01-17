import React from 'react';
import { Link } from 'react-router-dom';

class Article extends React.Component {
  state = {
    articleInfo: {}
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
  }
  
  render() {
    const articleInfo = this.state
    console.log(articleInfo.articleInfo)
    return (
      <div>
        <h2>Article Page</h2>
       <h3>{articleInfo.articleInfo.title}</h3>
       <p>{articleInfo.articleInfo.body}</p>
       <Link to={`/users/${articleInfo.articleInfo.created_by}`}>by {articleInfo.articleInfo.created_by} </Link>
       <p>likes: {articleInfo.articleInfo.votes}</p>
      </div>
    )
  }
}

export default Article