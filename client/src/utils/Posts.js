import { useState, useEffect } from "react";
import axios from "axios";
import { Routes } from "../utils/constants";
import { calculateLike, calculateDislike } from "./Utils";

export const Posts = {
  useFetchPosts: (route, auth) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      (async () => {
        let posts;
        if (auth && (auth.Token || auth.Username)) {
          posts = await axios.get(route, {
            headers: { Authorization: auth.Token, Username: auth.Username },
          });
        } else {
          posts = await axios.get(route);
        }
        setPosts(posts.data);
      })();
    }, [route, auth]);
    return [posts, setPosts];
  },
  delete: async (Authorization, post) => {
    return await axios.delete(Routes.Posts.getPostWithId(post.id), {
      headers: { Authorization },
    });
  },
  like: async (Authorization, post) => {
    return await axios
      .post(`${Routes.Posts.getPostWithId(post.id)}/1`, "", {
        headers: { Authorization },
      })
      .then((res) => {
        const { msg } = res.data;
        return calculateLike(msg, post);
      });
  },
  dislike: async (Authorization, post) => {
    return await axios
      .post(`${Routes.Posts.getPostWithId(post.id)}/0`, "", {
        headers: { Authorization },
      })
      .then((res) => {
        const { msg } = res.data;
        return calculateDislike(msg, post);
      });
  },
  create: async (Authorization, data) => {
    const { Title, Body } = data;
    return await axios
      .post(
        "/posts",
        { Title, Body },
        {
          headers: { Authorization },
        }
      )
      .then((res) => {
        return `/posts/${res.data.post.id}`;
      })
      .catch((err) => {
        return new Error(err.response);
      });
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
