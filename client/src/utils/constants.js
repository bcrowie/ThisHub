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
    LoginInitial: {
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
    random: "/posts/random",
    getPostWithId: (PostId) => {
      return `/posts/${PostId}`;
    },
  },
  Users: {
    myAccount: "/users/my-account",
    auth: `/users/auth`,
    login: `/users/login`,
    register: `/users/register`,
    updateEmail: "/users/my-account/change-email",
    updatePassword: "/users/my-account/change-password",
    userComments: "/users/my-account/comments",
    userDislikes: "/users/my-account/dislikes",
    userLikes: "/users/my-account/likes",
    userPosts: "/users/my-account/posts",
    users: "/users",
  },
  Comments: {
    getComments: (PostId) => {
      return `/posts/${PostId}/comments`;
    },
    getCommentById: (PostId, CommentId) => {
      return `/posts/${PostId}/comments/${CommentId}`;
    },
    likeComment: (PostId, CommentId, Like) => {
      return `/posts/${PostId}/comments/${CommentId}/${Like === true ? 1 : 0}`;
    },
  },
};
