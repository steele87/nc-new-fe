import React from 'react';
import { Link } from 'react-router-dom';

class Topics extends React.Component {
  state = {
    topics: []
  }

  componentDidMount() {
    fetch('https://northcoders-news-api.herokuapp.com/api/topics')
      .then((res) => {
        return res.json();
      })
      .then((topics) => {
        const topicsList = topics.topics
        this.setState({
          topics:topicsList
        })
      })
  }

  render() {
    return (
      <div>
    <h2>Topics Page</h2>
    {this.state.topics.map((topic, index) => (
      <div key={index}>
        <Link to='#'>{topic.title}</Link>
        <hr />
      </div>
    )
    )}
  </div>
    )
  }
}

export default Topics