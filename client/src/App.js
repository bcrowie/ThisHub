import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Utils } from './utils/utils'
import Nav from './components/Nav/Nav'
import PostList from './components/Posts/PostList'
import PostNav from './components/Nav/PostNav/PostNav'
import Register from './components/Register/Register'
import "./App.scss";
import NewPost from "./components/NewPost/NewPost";

export const UserContext = createContext()

const App = () => {
  const auth = Utils.Users.useAuthentication()

  return (
    <Router>
      <UserContext.Provider value={auth}>
        <Nav />
        <PostNav />
        <Switch>
          <div className="main-container">
            <Route path='/new-post' render={() => <NewPost />} />              
            <Route path="/my-account">
              <p>MyAccount page</p>
            </Route>
            <Route exact path='/' render={() => <PostList />} />
          </div>
        </Switch>
      </UserContext.Provider>
      <Route exact path='/register' render={() => <Register/>} />
    </Router>
  );
}

export default App;