import React from 'react';
import { Link } from 'react-router-dom';

class Articles extends React.Component {
  state = {
    articles: []
  }

  componentDidMount() {
    fetch('https://northcoders-news-api.herokuapp.com/api/articles')
      .then((res) => {
        return res.json();
      })
      .then((articles) => {
        const articleList = articles.articles
        this.setState({
          articles: articleList
        })
      })
  }

  render() {
    return (
      <div>
        <h2>Articles Page</h2>
        {this.state.articles.map((article, index) => (
        <div key={index}>
          <Link to='#'>{article.title}</Link>
          <p>likes: {article.votes}</p>
          <hr />
        </div>
      )
      )}
      </div>
    )
  }
}

export default Articles