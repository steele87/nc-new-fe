import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

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
    console.log(this.state.articles)
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <h1>NC News</h1>
            <Navbar className="navbar" />
            <Route exact path='/' render={(props) => <Home {...props} articles={this.state.articles}/>} />
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
        <p>{article.title}</p>
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
    backgroundColor: 'red',
    margin: '2%',
  };
  return (
    <nav style={navStyle}>
      <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
      {' | '}
      <NavLink to="/#" activeStyle={activeStyle}>Topics</NavLink>
       {' | '}
      <NavLink to="#" activeStyle={activeStyle}>Article</NavLink>
    </nav>
  );
};


export default App;
