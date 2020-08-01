import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Constants } from "../utils/constants";

export const Comments = {
  create: async (data) => {
    const {
      comments,
      input,
      post,
      setComments,
      setError,
      showForm,
      User,
    } = data;

    if (!input) {
      setError("Comment must contain atleast 1 character");
    }

    await axios
      .post(
        Routes.Comments.getComments(post.id),
        {
          Body: input,
        },
        {
          headers: { Authorization: User.Token },
        }
      )
      .then((res) => {
        // Change Comment route to add Score
        setComments([res.data.comment, ...comments]);
        showForm();
      });
  },
  delete: async (data) => {
    const { comment, postId, User } = data;
    await axios.delete(Routes.Comments.getCommentById(postId, comment.id), {
      headers: { Authorization: User.Token },
    });
  },
  useFetchComments: (route, auth = null) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
      const fetchComments = async () => {
        const response = await axios.get(route, {
          headers: { Authorization: auth },
        });
        setComments(response.data);
      };
      fetchComments();
    }, [route, auth]);
    return [comments, setComments];
  },
  reply: async (auth, comment, post, input) => {
    await axios.post(
      Routes.Comments.getCommentById(post.id, comment.id),
      {
        Body: input,
      },
      {
        headers: {
          Authorization: auth.Token,
        },
      }
    );
  },
  like: async (params) => {
    const { User, post, comment } = params;
    await axios.post(
      Routes.Comments.likeComment(post.id, comment.id, true),
      {},
      {
        headers: {
          Authorization: User.Token,
        },
      }
    );
  },
  dislike: async (params) => {
    const { User, post, comment } = params;
    await axios.post(
      Routes.Comments.likeComment(post.id, comment.id, false),
      {},
      {
        headers: {
          Authorization: User.Token,
        },
      }
    );
  },
  edit: async (params) => {
    const { User, post, comment, input } = params;
    await axios.put(
      Routes.Comments.getCommentById(post.id, comment.id),
      {
        Body: input,
      },
      {
        headers: {
          Authorization: User.Token,
        },
      }
    );
  },
};
