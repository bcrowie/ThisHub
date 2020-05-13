export const Constants = {
  Posts: {
    Votes: {
      like: "Liked",
      dislike: "Disliked",
      likedDisliked: "Liked and Disliked",
      dislikedLiked: "Disliked and Liked",
      removedLike: "Removed Like",
      removedDislike: "Removed Dislike",
    },
  },
  Users: {
    Storage: {
      Token: "thishub.token",
      User: "thishub.user",
    },
    LoginDefault: {
      Email: null,
      Password: null,
    },
  },
  Comments: {
    deleted: "[Deleted]",
  },
};

export const Routes = {
  Posts: {
    posts: "/posts",
    getPostWithId: (PostId) => {
      return `/posts/${PostId}`;
    },
  },
  Users: {
    myAccount: "/users/my-account",
    auth: `/users/auth`,
    login: `/users/login`,
    register: `/users/register`,
    users: "/users",
    updateEmail: "/users/my-account/change-email",
    updatePassword: "/users/my-account/change-password",
  },
  Comments: {
    getComments: (PostId) => {
      return `/posts/${PostId}/comments`;
    },
    getCommentById: (PostId, CommentId) => {
      return `/posts/${PostId}/comments/${CommentId}`;
    },
  },
};
