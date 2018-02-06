import React from 'react';
import { Link } from 'react-router-dom';

class Topics extends React.Component {
  state = {
    topics: []
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/topics`)
      .then((res) => {
        return res.json();
      })
      .then((topics) => {
        const topicsList = topics.topic
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
        <Link className="link" to={`/topics/${topic.title}/articles`}>{topic.title}</Link>
        <hr />
      </div>
    )
    )}
  </div>
    )
  }
}

export default Topics