import React, { useContext } from "react";
import { UserContext } from "../../../../App";

const Controls = ({ editing, handleDelete, deleted, setEditing, Username }) => {
  const User = useContext(UserContext);

  return (
    <div className="controls">
      {User.Username === Username && !deleted && (
        <>
          <button onClick={() => setEditing(() => !editing)}>Edit</button>
          <button onClick={() => handleDelete()}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Controls;
