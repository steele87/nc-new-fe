import React from 'react';
import { Link } from 'react-router-dom';
import Voter from './Voter';
import changeVote from '../api';

class Articles extends React.Component {
  state = {
    articles: [],
    error: null,
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/articles`)
      .then((res) => {
        return res.json();
      })
      .then((articles) => {
        const articleList = articles.topics
        articleList.sort(function (a, b) {
          return b.votes - a.votes;
        });
        this.setState({
          articles: articleList
        })
      })
      .catch(error => {
        this.setState({
          error,
        })
      })
  }

  updateVote = (id, vote) => {
    changeVote(id, vote)
      .then(res => {
        const { _id: newArticleID } = res.article;

        const newArticles = this.state.articles.map(article => {

          if (article._id === newArticleID) article.votes = res.article.votes;
          return article;
        });
        this.setState({
          articles: newArticles
        })
      })
      .catch(error => {
        this.setState({
          error,
        })
      })
  }

  render() {
    if (this.state.error) return this.state.error;
    return (
      <div>
        <h2><i className="far fa-bookmark"></i> Articles Page</h2>
        {this.state.articles.map((article, index) => (
          <div key={index}>
            <Link className="link" to={`/articles/${article._id}`}>{article.title}</Link>
            <Voter id={article._id} votes={article.votes} updateVote={this.updateVote} />
            <hr />
          </div>
        )
        )}
      </div>
    )
  }
}

export default Articles