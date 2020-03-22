import React, { useEffect, useState } from "react";
import Alert from "./common/Alert";
import axios from "../axios";

const Login = props => {
  let userData = {
    username: "",
    password: "",
    message: "",
    messageType: ""
  };
  const [state, setState] = useState(userData);

  //handelChange

  const handelChange = e => {
    setState({
      ...state,
      message: "",
      messageType: "",
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (props.isAuth === true) {
      props.history.push("/products");
    }
  }, [props.isAuth, props.history]);

  const login = e => {
    e.preventDefault();

    const { username, password } = state;
    const data = {
      username,
      password
    };
    if (!username || !password) {
      return setState({
        ...state,
        message: "Please enter username and password",
        messageType: "error"
      });
    }

    axios
      .post("/api/users/login", data)
      .then(res => {
        let data = res.data;
        localStorage.setItem("userAuth", data.id);
        props.setAuth(true);
      })
      .catch(err => {
        if (err && err.response) {
          setState({
            ...state,
            message: err.response.data.error.message,
            messageType: "error"
          });
        }
      });
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="navbar navbar-dark bg-primary text-white mb-3">
          {" "}
          Login
        </div>
        <div className="form__wrapper">
          {state.message && (
            <Alert message={state.message} messageType={state.messageType} />
          )}

          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                name="username"
                value={state.username}
                onChange={handelChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                name="password"
                className="form-control"
                value={state.password}
                onChange={handelChange}
              />
              <button type="submit" className="btn btn-primary login_btn">
                Login
              </button>

              <span></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
