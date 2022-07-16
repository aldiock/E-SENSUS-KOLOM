import React from "react";
import { HashLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <div className="loading">
      <HashLoader color={"B1B4B3"} size={150} loading={loading} />
    </div>
  );
};

export default Loading;
