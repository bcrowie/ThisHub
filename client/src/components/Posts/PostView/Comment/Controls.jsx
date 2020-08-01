import React, { useContext } from "react";
import { UserContext } from "../../../../App";

const Controls = ({ editing, handleDelete, deleted, setEditing, Username }) => {
  const User = useContext(UserContext);

  return (
    <div className="controls">
      {!deleted && <button>Save</button>}
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
