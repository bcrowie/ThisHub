import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from '../../App'
import constants from '../../utils/constants'
import Post from './Post/Post'
import "./PostList.scss";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const User = useContext(UserContext);

  useEffect(() => {
    async function fetchPosts() {
      await axios.get("/posts").then((post) => {
        setPosts(post.data);
      });
    }
    fetchPosts();
  }, []);

  const deletePost = async (post) => {
    const removedPost = await axios.delete(`/posts/${post.id}`, {
      headers: { Authorization: User.Token },
    });

    if (removedPost) {
      const idx = posts.indexOf(post);
      posts.splice(idx, 1);
      setPosts([...posts]);
    }
  };

  const likePost = async (post, like) => {
    // Still working on optimistic updating for this.
    const liked = await axios.post(`/posts/${post.id}/${like}`, "",{
      headers: { Authorization: User.Token },
    });

    const newPosts = posts;
    const idx = newPosts.indexOf(post);
    
    if (liked.data === "Liked") {
      posts[idx].Score += 1
    } else if (liked.data === "Disliked") {
      posts[idx].Score -= 1
    } else if (liked.data === "Liked and Disliked") {
      posts[idx].Score += 2
    } else if (liked.data === "Disliked and Liked") {
      posts[idx].Score -= 2
    }
    setPosts([...posts])
};


  if(!posts){
    return (
      <div>
        <ul className="post-list">
          <li>
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
              delete={() => deletePost(post)}
              like={() => likePost(post, constants.like)}
              dislike={() => likePost(post, constants.dislike)}/>
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;
