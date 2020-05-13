import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Utils } from "./utils/utils";
import Settings from "./components/Settings/Settings";
import Login from "./components/Nav/Login/Login";
import Nav from "./components/Nav/Nav";
import PostList from "./components/Posts/PostList";
import PostNav from "./components/Nav/PostNav/PostNav";
import PostView from "./components/Posts/PostView/PostView";
import Register from "./components/Register/Register";
import NewPost from "./components/NewPost/NewPost";
import "./App.scss";

export const UserContext = createContext();
export const LoginContext = createContext();

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const auth = Utils.Users.useAuthentication();

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
          <PostNav />
          <Switch>
            <div className="main-container">
              <Route path="/posts/:postId" component={PostView} />
              <Route path="/new-post" component={NewPost} />
              <Route path="/my-account" component={Settings} />
              <Route
                exact
                path="/"
                render={() => <PostList showLogin={setShowLogin} />}
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
