import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext, LoginContext } from "../../App";
import { Posts as PostUtils } from "../../utils/Posts";
import { userLoggedIn } from "../../utils/Utils";
import NewPostField from "./NewPostField/NewPostField";
import Post from "./Post/Post";
import Sidebar from "./Sidebar/Sidebar";
import "./PostList.scss";

const PostList = ({ route }) => {
  const Location = useLocation();
  const User = useContext(UserContext);
  const { showLogin, setShowLogin } = useContext(LoginContext);
  const [posts, setPosts] = PostUtils.useFetchPosts(route, User);

  const updateScore = (newPost) => {
    setPosts(
      posts.map((orig) => {
        if (orig.id !== newPost.id) {
          return orig;
        }
        return { ...orig, newPost };
      })
    );
  };

  const handleDelete = async (post) => {
    if (userLoggedIn(User)) {
      const deleted = await PostUtils.delete(User.Token, post);
      console.log(deleted);
      if (deleted) {
        setPosts(posts.filter((toDelete) => toDelete.id !== post.id));
      }
    } else {
      setShowLogin(!showLogin);
    }
  };

  const handleLike = async (post) => {
    userLoggedIn(User)
      ? updateScore(await PostUtils.like(User.Token, post))
      : setShowLogin(!showLogin);
  };

  const handleDislike = async (post) => {
    userLoggedIn(User)
      ? updateScore(await PostUtils.dislike(User.Token, post))
      : setShowLogin(!showLogin);
  };

  if (!posts.length) {
    return (
      <div className="posts">
        <ul className="post-list">
          <NewPostField />
          <li key="0" className="no-post">
            <pre className="post-title">
              No posts here! <Link to="/new-post">Create one!</Link>
            </pre>
          </li>
        </ul>
        <Sidebar />
      </div>
    );
  } else {
    return (
      <div className="posts">
        <ul className="post-list">
          <NewPostField />
          {posts.map((post) => (
            <Post
              key={post.id}
              data={post}
              deletePost={handleDelete}
              like={handleLike}
              dislike={handleDislike}
            />
          ))}
        </ul>
        {Location.pathname !== "/my-account" && <Sidebar />}
      </div>
    );
  }
};

export default PostList;
