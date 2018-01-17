import React from 'react';
import { Link } from 'react-router-dom';

class Users extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch('https://northcoders-news-api.herokuapp.com/api/users')
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        const userList = users.users
        this.setState({
          users:userList
        })
      })
  }

  render() {
    return (
      <div>
    <h2>Users Page</h2>
    {this.state.users.map((user, index) => (
      <div key={index}>
        <Link to='#'>{user.username} </Link>
        <img src={`${user.avatar_url}`}/>
        <hr />
      </div>
    )
    )}
  </div>
    )
  }
}

export default Users