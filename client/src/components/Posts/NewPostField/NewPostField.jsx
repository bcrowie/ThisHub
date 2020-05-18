import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
import "./NewPostField.scss";

const NewPostField = () => {
  const History = useHistory();

  return (
    <div className="new-post-form">
      <Icon path={mdiAccount} title="Account" size={1.3} />
      <input
        type="text"
        placeholder="Create new post..."
        onClick={() => History.push("/new-post")}
      />
    </div>
  );
};

export default NewPostField;
