import React from "react";
import { useHistory } from "react-router-dom";

const GoBack = () => {
  const History = useHistory();

  const handleBack = () => {
    History.goBack();
  };
  return (
    <div className="back">
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
};

export default GoBack;
