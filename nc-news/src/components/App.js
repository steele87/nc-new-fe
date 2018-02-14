import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom';
import Topics from './Topics';
import TopicArticles from './TopicArticles';
import Users from './Users';
import UserComponent from './UserComponent';
import PageNotFound from './PageNotFound';
import Articles from './Articles';
import Article from './Article';

class App extends Component {
  state = {
    articles: [],
    northcoder: {},
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/articles`)
      .then((res) => {
        return res.json();
      })
      .then((articles) => {
        let articleList = articles.topics
        return articleList.sort(function (a, b) {
          return b.votes - a.votes;
        });
      })
      .then((sortedArticles) => {
        this.setState({
          articles: sortedArticles.slice(0, 3)
        })
      })
    fetch(`${process.env.REACT_APP_API_URL}/users/northcoder`)
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        const userInfo = user.user
        this.setState({
          northcoder: userInfo[0]
        })
      })
  }


  render() {
    const user = this.state.northcoder;
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar className="navBar" />
            <NavLink className="loggedIn" to="/users/northcoder"><i className="fas fa-user"></i> {user.username} <img src={`${user.avatar_url}`} alt="user" style={{ height: 30 }} className="profileImg" /></NavLink>
            <img className="logo" src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png" alt="Northcoders logo" />
            <h1>News</h1>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} articles={this.state.articles} />} />
              <Route exact path='/topics' component={Topics} />
              <Route exact path='/articles' component={Articles} />
              <Route exact path='/articles/:article_id' component={Article} />
              <Route exact path='/topics/:topic/articles' component={TopicArticles} />
              <Route exact path='/users' component={Users} />
              <Route path='/users/:username' component={UserComponent} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </BrowserRouter>
        <div className="soicalMedia">
          <a href="https://twitter.com/northcoders"><i className="fab fa-twitter-square"></i>   </a>
          <a href="https://www.facebook.com/northcoders/"><i className="fab fa-facebook-square"></i>   </a>
        </div>
      </div>
    );
  }
}


const Home = (props) => {
  return (
    <div >
      <h2><i className="fas fa-home"></i> Home Page</h2>
      <h3>Top Articles</h3>
      {props.articles.map((article, index) => (
        <div className="commentBox" key={index}>
          <Link className="link" to={`/articles/${article._id}`}>{article.title}</Link>
          <p><i className="far fa-thumbs-up"></i> likes: {article.votes}</p>
          <hr />
        </div>
      )
      )}
    </div>
  )
};


const Navbar = () => {
  const activeStyle = {
    color: 'rgb(209, 35, 35)'
  };
  const navStyle = {
    padding: '3%',
    width: '100%',
  };
  return (
    <nav style={navStyle}>
      {' { '}
      <NavLink className="navLink" exact to="/" activeStyle={activeStyle}><i className="fas fa-home"></i> Home</NavLink>
      {' || '}
      <NavLink className="navLink" to="/topics" activeStyle={activeStyle}><i className="fas fa-book"></i> Topics</NavLink>
      {' || '}
      <NavLink className="navLink" to="/articles" activeStyle={activeStyle}><i className="far fa-bookmark"></i> Articles</NavLink>
      {' || '}
      <NavLink className="navLink" to="/users" activeStyle={activeStyle}><i className="fas fa-users"></i> Users</NavLink>
      {' } '}
    </nav>
  );
};


export default App;
