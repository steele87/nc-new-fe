import React from 'react';
import { Link } from 'react-router-dom';

class Topics extends React.Component {
  state = {
    topics: [],
    error: null,
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/topics`)
      .then((res) => {
        return res.json();
      })
      .then((topics) => {
        const topicsList = topics.topics
        this.setState({
          topics: topicsList
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
        <h2><i className="fas fa-book"></i> Topics Page</h2>
        {this.state.topics.map((topic, index) => (
          <div key={index} className="topicBox">
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