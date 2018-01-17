import React from 'react';
import { Link } from 'react-router-dom';

class TopicArticles extends React.Component {
  state = {
    articles: [],
    topic: '',
  }

  componentDidMount() {
    let topic = this.props.match.params.topic.toLowerCase();
    fetch(`https://northcoders-news-api.herokuapp.com/api/topics/${topic}/articles`)
      .then((res) => {
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
    console.log(this.state.articles)
    return (
      <div>
        <h2>{this.state.topic} Page</h2>
        {this.state.articles.map((article, index) => (
          <div key={index}>
            <p>{article.title}</p>
            <Link to={`/users/${article.created_by}`}>by: {article.created_by} </Link >
            <hr />
          </div>
        )
        )}
      </div>
    )
  }
}

export default TopicArticles