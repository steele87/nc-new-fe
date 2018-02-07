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
        const userList = users.user
        this.setState({
          users: userList
        })
      })
  }

  render() {
    return (
      <div>
        <h2><i className="fas fa-users"></i> Users Page</h2>
        {this.state.users.map((user, index) => (
          <div key={index}>
            <img src={`${user.avatar_url}`} alt="user" style={{ width: 100 }} className="profileImg"/>
            <br />
            <Link className="link" to={`/users/${user.username}`}>{user.username} </Link>
            <hr />
          </div>
        )
        )}
      </div>
    )
  }
}

export default Users