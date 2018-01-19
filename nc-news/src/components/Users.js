import React from 'react';
import { Link } from 'react-router-dom';

class Users extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        const userList = users.users
        this.setState({
          users: userList
        })
      })
  }

  render() {
    return (
      <div>
        <h2>Users Page</h2>
        {this.state.users.map((user, index) => (
          <div key={index}>
            <Link className="link" to={`/users/${user.username}`}>{user.username} </Link>
            <img src={`${user.avatar_url}`} alt="user" style={{ width: 100 }} />
            <hr />
          </div>
        )
        )}
      </div>
    )
  }
}

export default Users