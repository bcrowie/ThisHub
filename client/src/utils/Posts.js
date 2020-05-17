import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Constants } from "../utils/constants";

export const Posts = {
  useFetchPosts: (route, auth = null) => {
    // Add authorization for fetching posts with
    // like/dislike info attached
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await axios.get(route, {
          headers: { Authorization: auth },
        });
        setPosts(response.data);
      };
      fetchPosts();
    }, [route, auth]);
    return [posts, setPosts];
  },
  delete: async (Authorization, showLogin, setPosts, post, posts) => {
    if (Authorization) {
      const response = await axios.delete(Routes.Posts.getPostWithId(post.id), {
        headers: { Authorization },
      });
      if (response) {
        const id = post.id;
        setPosts(posts.filter((post) => post.id !== id));
      }
    } else {
      showLogin(true);
    }
  },
  like: async (Authorization, showLogin, setPosts, post, posts) => {
    if (Authorization) {
      await axios
        .post(`${Routes.Posts.getPostWithId(post.id)}/1`, "", {
          headers: { Authorization },
        })
        .then((res) => {
          const { msg } = res.data;
          if (msg === Constants.Posts.Votes.like) {
            post.Score += 1;
          } else if (msg === Constants.Posts.Votes.likedDisliked) {
            post.Score += 2;
          } else if (msg === Constants.Posts.Votes.removedLike) {
            post.Score -= 1;
          }
          setPosts(
            posts.map((orig) => {
              if (orig.id !== post.id) {
                return orig;
              }
              return { ...orig, post };
            })
          );
        });
    } else {
      showLogin(true);
    }
  },
  dislike: async (Authorization, showLogin, setPosts, post, posts) => {
    if (Authorization) {
      await axios
        .post(`${Routes.Posts.getPostWithId(post.id)}/0`, "", {
          headers: { Authorization },
        })
        .then((res) => {
          const { msg } = res.data;
          if (msg === Constants.Posts.Votes.dislike) {
            post.Score -= 1;
          } else if (msg === Constants.Posts.Votes.dislikedLiked) {
            post.Score -= 2;
          } else if (msg === Constants.Posts.Votes.removedDislike) {
            post.Score += 1;
          }
          setPosts(
            posts.map((orig) => {
              if (orig.id !== post.id) {
                return orig;
              }
              return { ...orig, post };
            })
          );
        });
    } else {
      showLogin(true);
    }
  },
  create: async (event, Authorization, data, history, setErrors) => {
    event.preventDefault();
    if (Authorization) {
      const { Title, Body } = data;
      await axios
        .post(
          Routes.Posts.getPosts,
          { Title, Body },
          {
            headers: { Authorization },
          }
        )
        .then((res) => {
          // send to new post page
          history.push(`/posts/${res.response.id}`);
        })
        .catch((err) => {
          const { Title, Body } = err.response.data;
          setErrors({ Title, Body });
        });
    }
  },
};
