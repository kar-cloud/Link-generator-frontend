import React from "react";

const Message = ({ message }) => {
  if (message) {
    return (
      <div className="messageContainer">
        <p className="messageDescription">{message}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Message;
