import { userLoggedIn } from "../../utils/Utils";
import { Posts as PostUtils } from "../../utils/Posts";

export const handleDelete = async (obj) => {
  const { post, posts, setPosts, showLogin, setShowLogin, User } = obj;
  if (userLoggedIn(User)) {
    const deleted = await PostUtils.delete(User.Token, post);
    if (deleted) {
      setPosts(posts.filter((toDelete) => toDelete.id !== post.id));
    }
  } else {
    setShowLogin(!showLogin);
  }
};

export const handleLike = async (obj) => {
  const { post, posts, setPosts, showLogin, setShowLogin, User } = obj;
  userLoggedIn(User)
    ? updateScore(await PostUtils.like(User.Token, post), posts, setPosts)
    : setShowLogin(!showLogin);
};

export const handleDislike = async (obj) => {
  const { post, posts, setPosts, showLogin, setShowLogin, User } = obj;
  userLoggedIn(User)
    ? updateScore(await PostUtils.dislike(User.Token, post), posts, setPosts)
    : setShowLogin(!showLogin);
};

export const togglePostMenu = ({ e, showMenu, setShowMenu }) => {
  e.stopPropagation();
  setShowMenu((showMenu) => !showMenu);
};

export const truncateBody = (body) => {
  if (body.length > 300) {
    return body.substring(0, 300).concat("...");
  } else {
    return body;
  }
};

export const truncateTitle = (title) => {
  if (title.length > 35) {
    return title.substring(0, 35).concat("...");
  } else {
    return title;
  }
};

export const updateScore = (newPost, posts, setPosts) => {
  setPosts(
    posts.map((orig) => {
      if (orig.id !== newPost.id) {
        return orig;
      }
      return { ...orig, newPost };
    })
  );
};
