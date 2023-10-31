import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, API_ENDPOINT_REGISTER_MEMBER } from "../../Constants";
import Message from "../Home/message";
import { verifyToken } from "../../Services";

const RegisterMember = () => {
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
    username: "",
  });
  const [error, setError] = useState(null);

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + API_ENDPOINT_REGISTER_MEMBER,
        authDetails
      );
      if (response && response.status == 201 && response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        console.log(err);
        setError("Something Went Wrong");
      }
      setTimeout(() => {
        setError(null);
      }, 2500);
      navigate("/register");
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
      <h1 className="loginHeading">Register</h1>
      <form onSubmit={handleRegistration}>
        <div className="registrationForm">
          {error ? <Message message={error} /> : null}
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

          <label className="registrationLabel" htmlFor="usernameInput">
            Username
          </label>
          <input
            id="usernameInput"
            className="loginInput"
            name="username"
            placeholder="Enter Username"
            onChange={handleChangeInput}
            required
          />

          <button className="registrationContinueButton" type="submit">
            <p>REGISTER</p>
          </button>
          <div className="noAccountDiv">
            <hr className="loginLine" />
            <p className="loginRegisterLine">Already have an Account ?</p>
            <Link className="loginRegisterButton" to="/">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterMember;
