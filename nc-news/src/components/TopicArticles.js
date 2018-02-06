import React from 'react';
import { Link } from 'react-router-dom';

class TopicArticles extends React.Component {
  state = {
    articles: [],
    topic: '',
  }

  componentDidMount() {
    let topic = this.props.match.params.topic.toLowerCase();
    fetch(`${process.env.REACT_APP_API_URL}/topics/${topic}/articles`, {
      method: 'GET',
      headers: new Headers ({
        'Content-Type': 'application/json'
      })
    }
      )
      .then((res) => {
        console.log(res)
        return res.json();
      })
      .then((articles) => {
        const topicArticles = articles.articles;
        this.setState({
          articles: topicArticles,
          topic: this.props.match.params.topic,
        })
      })
  }

  render() {
    return (
      <div>
        <h2>{this.state.topic} Page</h2>
        {this.state.articles.map((article, index) => (
          <div key={index}>
          <Link className="link" to={`/articles/${article._id}`}>{article.title}</Link>
          {' | '}
            <Link className="link" to={`/users/${article.created_by}`}>by: {article.created_by} </Link >
            <hr />
          </div>
        )
        )}
      </div>
    )
  }
}

export default TopicArticles