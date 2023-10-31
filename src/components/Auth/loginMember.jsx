import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, API_ENDPOINT_LOGIN_MEMBER } from "../../Constants";
import AuthError from "./authError";
import { verifyToken } from "../../Services";

const LoginMember = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token)
        .then((isVerified) => {
          if (isVerified) {
            navigate("/home");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const navigate = useNavigate();
  const [authDetails, setAuthDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + API_ENDPOINT_LOGIN_MEMBER,
        authDetails
      );
      if (response && response.status == 201 && response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        console.log(err);
        setError("Something Went Wrong");
      }
      setTimeout(() => {
        setError(null);
      }, 2500);
      navigate("/");
    }
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setAuthDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="loginHeading">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="registrationForm">
          {error ? <AuthError error={error} /> : null}
          <label className="registrationLabel" htmlFor="emailInput">
            Email
          </label>
          <input
            id="emailInput"
            className="loginInput"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            onChange={handleChangeInput}
            required
          />
          <label className="registrationLabel" htmlFor="passwordInput">
            Password
          </label>
          <input
            id="passwordInput"
            type="password"
            className="loginInput"
            name="password"
            placeholder="Enter Password"
            onChange={handleChangeInput}
            required
          />
          <button className="registrationContinueButton" type="submit">
            <p>LOGIN</p>
          </button>
          <div className="noAccountDiv">
            <hr className="loginLine" />
            <p className="loginRegisterLine">Don't have an Account ?</p>
            <Link className="loginRegisterButton" to="/register">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginMember;
