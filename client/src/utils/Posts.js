import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Constants } from "../utils/constants";

export const Posts = {
  useFetchPosts: (route, auth) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        let posts;

        if (auth && (auth.Token || auth.Username)) {
          posts = await axios.get(route, {
            headers: { Authorization: auth.Token, Username: auth.Username },
          });
        } else {
          posts = await axios.get(route);
        }
        setPosts(posts.data);
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
            post.PostLikes.push("");
          } else if (msg === Constants.Posts.Votes.likedDisliked) {
            post.Score += 2;
            post.PostDislikes.pop();
            post.PostLikes.push("");
          } else if (msg === Constants.Posts.Votes.removedLike) {
            post.Score -= 1;
            post.PostLikes.pop();
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
            post.PostDislikes.push("");
          } else if (msg === Constants.Posts.Votes.dislikedLiked) {
            post.Score -= 2;
            post.PostLikes.pop();
            post.PostDislikes.push("");
          } else if (msg === Constants.Posts.Votes.removedDislike) {
            post.Score += 1;
            post.PostDislikes.pop();
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
  create: async (Authorization, data, setErrors) => {
    if (Authorization) {
      const { Title, Body } = data;
      let returnLink;
      await axios
        .post(
          "/posts",
          { Title, Body },
          {
            headers: { Authorization },
          }
        )
        .then((res) => {
          returnLink = `/posts/${res.data.post.id}`;
        })
        .catch((err) => {
          const { Title, Body } = err.response;
          setErrors({ Title, Body });
        });
      return returnLink;
    } else {
      setErrors({ Title: "You must be logged in to do that." });
    }
  },
  edit: async (auth, data) => {
    if (auth) {
      const Body = data.data;
      const Post = data.post;
      await axios.put(
        `/posts/${Post.id}`,
        { Body },
        { headers: { Authorization: auth.Token } }
      );
    } else {
      return false;
    }
  },
};
