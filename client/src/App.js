import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Utils } from "./utils/utils";
import Settings from "./components/Settings/Settings";
import Login from "./components/Nav/Login/Login";
import Nav from "./components/Nav/Nav";
import PostList from "./components/Posts/PostList";
import PostNav from "./components/Nav/PostNav/PostNav";
import Register from "./components/Register/Register";
import NewPost from "./components/NewPost/NewPost";
import "./App.scss";

export const UserContext = createContext();

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const auth = Utils.Users.useAuthentication();

  return (
    <Router>
      <UserContext.Provider value={auth}>
        {showLogin && (
          <div className="login-modal">
            <Login hideModal={() => setShowLogin((showLogin) => !showLogin)} />
          </div>
        )}
        <Nav toggleModal={() => setShowLogin((showLogin) => !showLogin)} />
        <PostNav />
        <Switch>
          <div className="main-container">
            <Route path="/new-post" render={() => <NewPost />} />
            <Route
              exact
              path="/"
              render={() => <PostList showLogin={setShowLogin} />}
            />
            <Route path="/my-account" render={() => <p>Account page</p>} />
            <Route
              path="/premium"
              render={() => <p>Premium registration page</p>}
            />
            <Route path="/settings" render={() => <Settings />} />
          </div>
        </Switch>
      </UserContext.Provider>
      <Route exact path="/register" render={() => <Register />} />
    </Router>
  );
};

export default App;
