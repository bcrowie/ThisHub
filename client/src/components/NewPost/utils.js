import { userLoggedIn } from "../../utils/Utils";
import { Posts as PostUtils } from "../../utils/Posts";

export const handleSubmit = async (obj) => {
  const { e, History, inputs, setErrors, User } = obj;
  e.preventDefault();
  if (userLoggedIn(User)) {
    const returnLink = await PostUtils.create(User.Token, inputs);
    if (returnLink) {
      History.push(returnLink);
    } else {
      setErrors(returnLink);
    }
  } else {
    setErrors({ Title: "You must be logged in to do that" });
  }
};
