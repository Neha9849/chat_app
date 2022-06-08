import React from "react";

const Alert = ({msg}) => {
  return (
    <>
      <div className="flexc m-2">
        <div className="msgAlert">
          <p className="text-center px-2">{msg}</p>
        </div>
      </div>
    </>
  );
};

export default Alert;
