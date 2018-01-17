import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
import Topics from './Topics';
import Users from './Users';
import UserComponent from './UserComponent';

class App extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    fetch('https://northcoders-news-api.herokuapp.com/api/articles')
      .then((res) => {
        return res.json();
      })
      .then((articles) => {
        const articleList = articles.articles
        this.setState({
          articles: articleList
        })
      })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <h1>NC News</h1>
            <Navbar className="navbar" />
            <Route exact path='/' render={(props) => <Home {...props} articles={this.state.articles} />} />
            <Route exact path='/topics' component={Topics} />
            <Route exact path='/users' component={Users} />
            <Route  path='/users/:username' component={UserComponent} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


const Home = (props) => {
  return (
    <div>
      <h2>Home Page</h2>
      {props.articles.map((article, index) => (
        <div key={index}>
          <Link to='#'>{article.title}</Link>
          <p>likes: {article.votes}</p>
          <hr />
        </div>
      )
      )}
    </div>
  )
};


const Navbar = () => {
  const activeStyle = {
    color: 'white'
  };
  const navStyle = {
    backgroundColor: 'black',
    margin: '2%',
  };
  return (
    <nav style={navStyle}>
      <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
      {' | '}
      <NavLink to="/topics" activeStyle={activeStyle}>Topics</NavLink>
      {' | '}
      <NavLink to="#" activeStyle={activeStyle}>Articles</NavLink>
      {' | '}
      <NavLink to="/users" activeStyle={activeStyle}>Users</NavLink>
    </nav>
  );
};


export default App;
