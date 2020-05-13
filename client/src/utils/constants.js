export const PostConst = {
  Endpoint: {
    Posts: "/posts",
  },
  Likes: {
    like: "Liked",
    dislike: "Disliked",
    likedDisliked: "Liked and Disliked",
    dislikedLiked: "Disliked and Liked",
    removedLike: "Removed Like",
    removedDislike: "Removed Dislike",
  },
};

export const UserConst = {
  Endpoint: {
    Auth: `/users/auth`,
    Login: `/users/login`,
    Register: `/users/register`,
    Users: "/users",
  },
  Storage: {
    Token: "thishub.token",
    User: "thishub.user",
  },
  LoginDefault: {
    Email: null,
    Password: null,
  },
};

export const CommentConst = {
  deleted: "[Deleted]",
};
