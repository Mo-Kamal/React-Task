import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, signIn } from "../actions";
import "../css/Login.scss";

const Login = () => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  let history = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const Validation = ([inputName, inputData]) => {
    if (!inputData.trim()) {
      setErrors((errors) => ({
        ...errors,
        [inputName]: `${inputName} is required`,
      }));
      return false;
    } else if (inputData.trim().length < 3) {
      console.log(inputName);

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
      console.log(userAuth);
      dispatch(signIn(userAuth));
      history("/posts");
    } else {
      console.log("s");
      return false;
    }

    console.log("sub");
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
      </form>
    </div>
  );
};

export default Login;

// const Login = () => {
//   // const [values, setValues] = useState({ username: "", password: "" });
//   // //   const [submitError, setSubmitError] = useState("");
//   const [errors, setErrors] = useState({
//     username: "",
//     password: "",
//   });
//   let history = useNavigate();
//   // const changeHandler = (e) => {
//   //   console.log("s");
//   //   console.log(e.target.value);
//   //   setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
//   //   // console.log(e);
//   // };

//   //   let errors = { username: "", password: "" };
//   const Validation = ([inputName, inputData]) => {
//     // console.log(errors);
//     if (!inputData.trim()) {
//       //   errors.username = "وارد کردن نام کاربری الزامی است";
//       // console.log(inputName);
//       setErrors((errors) => ({
//         ...errors,
//         [inputName]: "وارد کردن نام کاربری الزامی است",
//       }));
//       return false;
//     } else if (inputData.trim().length < 5) {
//       console.log(inputName);
//       //   errors.username = "نام کاربری باید بیشتر از 4 حرف باشد";
//       setErrors((errors) => ({
//         ...errors,
//         [inputName]: `نام ${inputName} باید بیشتر از 4 حرف باشد`,
//       }));
//       return false;
//     } else if (inputData.trim().length > 20) {
//       //   errors.username = "نام کاربری باید کمتر از 20 حرف باشد";
//       setErrors((errors) => ({
//         ...errors,
//         [inputName]: "نام کاربری باید کمتر از 20 حرف باشد",
//       }));
//       return false;
//     } else {
//       setErrors((errors) => ({
//         ...errors,
//         [inputName]: "",
//       }));
//       return true;
//     }
//   };

//   //   const Validation = () => {
//   //     if (!values.username.trim()) {
//   //       //   errors.username = "وارد کردن نام کاربری الزامی است";
//   //       console.log(values.username);
//   //       setErrors(() => ({
//   //         ...errors,
//   //         username: "وارد کردن نام کاربری الزامی است",
//   //       }));
//   //     } else if (values.username.trim().length < 5) {
//   //       console.log("2");
//   //       //   errors.username = "نام کاربری باید بیشتر از 4 حرف باشد";
//   //       setErrors(() => ({
//   //         ...errors,
//   //         username: "نام کاربری باید بیشتر از 4 حرف باشد",
//   //       }));
//   //     } else if (values.username.trim().length > 20) {
//   //       //   errors.username = "نام کاربری باید کمتر از 20 حرف باشد";
//   //       setErrors(() => ({
//   //         ...errors,
//   //         username: "نام کاربری باید کمتر از 20 حرف باشد",
//   //       }));
//   //     }
//   //     if (!values.password.trim()) {
//   //       errors.password = "وارد کردن رمز عبور الزامی است";
//   //     } else if (values.password.trim().length < 9) {
//   //       errors.password = "رمز عبور باید بیشتر از 8 حرف باشد";
//   //     } else if (values.password.trim().length > 20) {
//   //       errors.password = "رمز عبور باید کمتر از 20 حرف باشد";
//   //     }
//   //   };
//   const callbackFunction = () => {
//     const isEmpty = Object.values(errors).every((x) => x === null || x === "");
//     if (isEmpty) {
//       return false;
//     }
//   };

//   const onSubmitHandle = (event) => {
//     event.preventDefault();
//     const y = Validation(["username", event.target.elements.username.value]);
//     const t = Validation(["password", event.target.elements.password.value]);

//     if (y == false || t == false) {
//       return false;
//     }
//     console.log("sub");
//   };
//   return (
//     <div className="login-page">
//       <form className="login-form" onSubmit={onSubmitHandle}>
//         <h2>فرم ورود</h2>
//         <label>نام کاربری</label>
//         <input
//           type="text"
//           placeholder="نام کاربری خود را وارد کنید"
//           name="username"
//           // onChange={changeHandler}
//           //   required
//         />
//         <div className="error-message">{errors.username}</div>
//         <label>رمز عبور</label>
//         <input
//           type="password"
//           // onChange={changeHandler}
//           placeholder="رمز عبور خود را وارد کنید"
//           name="password"
//         />
//         <div className="error-message">{errors.password}</div>
//         <button type="submit">تایید</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
