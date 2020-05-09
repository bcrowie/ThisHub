import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Utils } from "./utils/utils";
import Account from "./components/Account/Account";
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
            <Route path="/my-account" render={() => <Account />} />
            <Route
              exact
              path="/"
              render={() => <PostList showLogin={setShowLogin} />}
            />
          </div>
        </Switch>
      </UserContext.Provider>
      <Route exact path="/register" render={() => <Register />} />
    </Router>
  );
};

export default App;
