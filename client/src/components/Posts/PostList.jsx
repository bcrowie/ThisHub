import React, { useContext } from "react";
import { UserContext } from '../../App'
import { Utils } from '../../utils/utils'
import Post from './Post/Post'
import "./PostList.scss";

const Posts = (props) => {
  const [posts, setPosts] = Utils.Posts.useFetchPosts();
  const User = useContext(UserContext);

  if(!posts){
    return (
      <div>
        <ul className="post-list">
          <li key={0}>
            <p className="post-title">No posts here!</p>
          </li>
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <ul className="post-list">
          {posts.map((post) => (
            <Post key={post.id} data={post} 
              delete={() => Utils.Posts.delete(User.Token, setPosts, post, posts)}
              like={() => Utils.Posts.like(User.Token, setPosts, post, posts)}
              dislike={() => Utils.Posts.dislike(User.Token, setPosts, post, posts)}/>
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;
