import { useState, useEffect } from "react";
import axios from "axios";
import { CommentConst, PostConst, UserConst } from "../utils/constants";

export const Utils = {
  Posts: {
    useFetchPosts: () => {
      // Add authorization for fetching posts with
      // like/dislike info attached
      const [posts, setPosts] = useState([]);
      useEffect(() => {
        const fetchPosts = async () => {
          const response = await axios.get(PostConst.Endpoint.Posts);
          setPosts(response.data);
        };
        fetchPosts();
      }, []);
      return [posts, setPosts];
    },
    delete: async (Authorization, showLogin, setPosts, post, posts) => {
      if (Authorization) {
        const response = await axios.delete(
          `${PostConst.Endpoint.Posts}/${post.id}`,
          {
            headers: { Authorization },
          }
        );
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
          .post(`${PostConst.Endpoint.Posts}/${post.id}/1`, "", {
            headers: { Authorization },
          })
          .then((res) => {
            const { msg } = res.data;
            if (msg === PostConst.Likes.like) {
              post.Score += 1;
            } else if (msg === PostConst.Likes.likedDisliked) {
              post.Score += 2;
            } else if (msg === PostConst.Likes.removedLike) {
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
          .post(`${PostConst.Endpoint.Posts}/${post.id}/0`, "", {
            headers: { Authorization },
          })
          .then((res) => {
            const { msg } = res.data;
            if (msg === PostConst.Likes.dislike) {
              post.Score -= 1;
            } else if (msg === PostConst.Likes.dislikedLiked) {
              post.Score -= 2;
            } else if (msg === PostConst.Likes.removedDislike) {
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
            `${PostConst.Endpoint.Posts}`,
            { Title, Body },
            {
              headers: { Authorization },
            }
          )
          .then((res) => {
            // send to new post page
            history.push("/");
          })
          .catch((err) => {
            const { Title, Body } = err.response.data;
            setErrors({ Title, Body });
          });
      } else {
        history.push("/register");
      }
    },
  },
  Users: {
    useAuthentication: () => {
      const [auth, setAuth] = useState({ Username: null, Token: null });

      useEffect(() => {
        const Token = localStorage.getItem(UserConst.Storage.Token);
        const Username = localStorage.getItem(UserConst.Storage.User);

        const fetchAuth = async () => {
          const response = await axios.post(
            `${UserConst.Endpoint.Auth}`,
            { Username },
            {
              headers: { Authorization: Token },
            }
          );

          if (response) {
            setAuth({ Username: response.data.Username, Token });
          }
        };

        if (Token && Username) {
          fetchAuth();
        }
      }, []);
      return auth;
    },
    login: async (event, data, setErrors) => {
      event.preventDefault();
      let { Email, Password } = data;
      Email = Email || "";
      Password = Password || "";

      await axios
        .post(`${UserConst.Endpoint.Login}`, {
          Email,
          Password,
        })
        .then((res) => {
          localStorage.setItem(UserConst.Storage.Token, res.data.token);
          localStorage.setItem(UserConst.Storage.User, res.data.Username);
          window.location.reload();
        })
        .catch((err) => {
          const { Email, Password } = err.response.data;
          setErrors({ Email, Password });
        });
    },
    logout: () => {
      localStorage.removeItem("thishub.token");
      localStorage.removeItem("thishub.user");
      window.location.reload();
    },
    register: async (event, data, setErrors) => {
      event.preventDefault();
      let { Username, Email, Email2, Password, Password2 } = data;
      Username = Username || "";
      Email = Email || "";
      Email2 = Email2 || "";
      Password = Password || "";
      Password2 = Password2 || "";
      await axios
        .post(`${UserConst.Endpoint.Register}`, {
          Username,
          Email,
          Email2,
          Password,
          Password2,
        })
        .then(() => {
          const data = { Email, Password };
          this.login(data);
        })
        .catch((err) => {
          const {
            Username,
            Email,
            Email2,
            Password,
            Password2,
          } = err.response.data;
          setErrors({ Username, Email, Email2, Password, Password2 });
        });
    },
    updateEmail: async (event, setErrors, inputs, User) => {
      event.preventDefault();

      await axios
        .post("/users/my-account/change-email", inputs, {
          headers: { Authorization: User.Token },
        })
        .then((res) => {
          // alert email change confirmation
        })
        .catch((err) => {
          const { Email, Email2 } = err.response.data;
          setErrors({ Email, Email2 });
        });
    },
    updatePassword: async (event, setErrors, inputs, User) => {
      event.preventDefault();

      await axios
        .post("/users/my-account/change-password", inputs, {
          headers: { Authorization: User.Token },
        })
        .then((res) => {
          // alert password change confirmation
        })
        .catch((err) => {
          const { Match, Password, Password2 } = err.response.data;
          setErrors({ Match, Password, Password2 });
        });
    },
    deleteAccount: async (event, setErrors, inputs, User) => {
      event.preventDefault();

      await axios
        .delete("/users/my-account", {
          headers: { Authorization: User.Token },
          data: {
            Email: inputs.Email,
            Password: inputs.Password,
          },
        })
        .then((res) => {
          // redirect to root
        })
        .catch((err) => {
          const { Match, Email, Password } = err.response.data;
          setErrors({ Match, Email, Password });
        });
    },
    // Implement Authorized Fetch when adding frontend functionality.
  },
  // Adding below once Comments have been implemented
  Comments: {
    create: async (event, Args) => {
      event.preventDefault();

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
          `/posts/${Post.id}/comments`,
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
    delete: async (comment, comments, post, setComments, User) => {
      comment.Body = CommentConst.deleted;
      comment.Username = CommentConst.deleted;

      await axios
        .delete(`/posts/${post.id}/comments/${comment.id}`, {
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
    fetch: async () => {},
    like: async () => {},
    dislike: async () => {},
  },
};
