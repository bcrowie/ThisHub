import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Users as Utils } from "./utils/Users";
import { Routes } from "./utils/constants";
import Settings from "./components/Settings/Settings";
import Login from "./components/Nav/Login/Login";
import Nav from "./components/Nav/Nav";
import PostList from "./components/Posts/PostList";
import PostView from "./components/Posts/PostView/PostView";
import Register from "./components/Register/Register";
import NewPost from "./components/NewPost/NewPost";
import "./App.scss";
import Account from "./components/Account/Account";

export const UserContext = createContext();
export const LoginContext = createContext();

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const auth = Utils.useAuthentication();

  return (
    <Router>
      <UserContext.Provider value={auth}>
        <LoginContext.Provider value={{ showLogin, setShowLogin }}>
          {showLogin && (
            <div className="login-modal">
              <Login
                hideModal={() => setShowLogin((showLogin) => !showLogin)}
              />
            </div>
          )}
          <Nav />
          <Switch>
            <div className="main-container">
              <Route path="/posts/:postId" component={PostView} />
              <Route path="/new-post" component={NewPost} />
              <Route path="/my-account" component={Account} />
              <Route path="/settings" component={Settings} />
              <Route
                exact
                path="/"
                render={() => (
                  <PostList
                    route={Routes.Posts.posts}
                    showLogin={setShowLogin}
                  />
                )}
              />
            </div>
          </Switch>
        </LoginContext.Provider>
      </UserContext.Provider>
      <Route exact path="/register" render={() => <Register />} />
    </Router>
  );
};

export default App;
