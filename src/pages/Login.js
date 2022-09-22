import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, signIn } from "../actions";
import "../css/Login.scss";

const Login = () => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    submit: "",
  });
  let history = useNavigate();
  const dispatch = useDispatch();
  // fetch users as database for user validation
  // the username and email in jsonplaceholder users have been used as username and password
  // example: username: "Bret", password:"Sincere@april.biz"
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // username/password validation
  const Validation = ([inputName, inputData]) => {
    if (!inputData.trim()) {
      setErrors((errors) => ({
        ...errors,
        [inputName]: `${inputName} is required`,
      }));
      return false;
    } else if (inputData.trim().length < 3) {
      setErrors((errors) => ({
        ...errors,
        [inputName]: `${inputName} must be more than 2 letters`,
      }));
      return false;
    } else if (inputData.trim().length > 35) {
      setErrors((errors) => ({
        ...errors,
        [inputName]: `${inputName} must be less than 35 letters`,
      }));
      return false;
    } else {
      setErrors((errors) => ({
        ...errors,
        [inputName]: "",
      }));
      return true;
    }
  };

  // onSubmit handler
  const onSubmitHandle = (event) => {
    event.preventDefault();
    const submittedUsername = event.target.elements.username.value;
    const submittedPassword = event.target.elements.password.value;
    const usernameValidation = Validation(["username", submittedUsername]);
    const passwordValidation = Validation(["password", submittedPassword]);

    if (usernameValidation == false || passwordValidation == false) {
      return false;
    }
    let userAuth;
    users?.map((user) => {
      if (
        user.username == submittedUsername &&
        user.email == submittedPassword
      ) {
        return (userAuth = { username: submittedUsername, userId: user.id });
      }
    });
    if (userAuth) {
      dispatch(signIn(userAuth));
      history("/");
    } else {
      setErrors((errors) => ({
        ...errors,
        submit: "username/password is not valid",
      }));
      return false;
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={onSubmitHandle}>
        <h2>Login Form</h2>
        <label>Username</label>
        <input
          type="text"
          placeholder="Please enter your username"
          name="username"
        />
        <div className="error-message">{errors.username}</div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Please enter your password"
          name="password"
        />
        <div className="error-message">{errors.password}</div>
        <button type="submit">Submit</button>
        <div className="error-message">{errors.submit}</div>
      </form>
    </div>
  );
};

export default Login;
