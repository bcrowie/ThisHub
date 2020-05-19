import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Constants } from "../utils/constants";

export const Comments = {
  create: async (Args) => {
    const {
      Comments,
      Input,
      Post,
      setComments,
      setError,
      showForm,
      User,
    } = Args;

    if (!Input) {
      setError("Comment must contain atleast 1 character");
    }

    await axios
      .post(
        Routes.Comments.getComments(Post.id),
        {
          Body: Input,
        },
        {
          headers: { Authorization: User.Token },
        }
      )
      .then((res) => {
        // Change Comment route to add Score
        setComments([res.data.comment, ...Comments]);
        showForm();
      });
  },
  delete: async (comment, comments, postId, setComments, User) => {
    comment.Body = Constants.Comments.deleted;
    comment.Username = Constants.Comments.deleted;

    await axios
      .delete(Routes.Comments.getCommentById(postId, comment.id), {
        headers: { Authorization: User.Token },
      })
      .then(() => {
        setComments(
          comments.map((orig) => {
            if (orig.id !== comment.id) {
              return orig;
            }
            return { ...orig, comment };
          })
        );
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
  like: async () => {},
  dislike: async () => {},
};
