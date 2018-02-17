import React from 'react';

class UserComponent extends React.Component {
  state = {
    user: []
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    fetch(`${process.env.REACT_APP_API_URL}/users/${username}`)
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        const userInfo = user.user
        this.setState({
          user: userInfo
        })
      })
  }

  render() {
    const userInfo = this.state.user;
    return (
      <div>
        <h2><i className="fas fa-user"></i> User Page</h2>
        {userInfo.map((user, index) => (
          <div className="frownFace" key={index}>
            <img src={`${user.avatar_url}`} alt="user" style={{ width: 150 }} className="profileImg" />
            <p>Name: {user.name}</p>
            <p>username: {user.username} </p>
            <hr />
          </div>
        )
        )}
        <div>
          {!userInfo.length ? <div className="frownFace"><i className="far fa-frown fa-lg " style={{ color: 'tomato' }} aria-hidden="true"></i><p>Sorry, user does not exist!</p></div> : <p></p>}
        </div>
      </div>
    )
  }
}

export default UserComponent