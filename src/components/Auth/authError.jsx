import React from "react";

const AuthError = ({ error }) => {
  if (error) {
    return (
      <div className="errorMessageContainer">
        <p className="errorMessageDescription">{error}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default AuthError;
