import { Constants } from "./constants";
const Posts = Constants.Posts;

export const calculateLike = (msg, data) => {
  if (msg === Posts.Votes.like) {
    data.Score += 1;
  } else if (msg === Posts.Votes.likedDisliked) {
    data.Score += 2;
  } else if (msg === Posts.Votes.removedLike) {
    data.Score -= 1;
  }
  return data;
};

export const calculateDislike = (msg, data) => {
  if (msg === Posts.Votes.dislike) {
    data.Score -= 1;
  } else if (msg === Posts.Votes.dislikedLiked) {
    data.Score -= 2;
  } else if (msg === Posts.Votes.removedDislike) {
    data.Score += 1;
  }
  return data;
};

export const userLoggedIn = (User) => {
  return User.Token ? true : false;
};
