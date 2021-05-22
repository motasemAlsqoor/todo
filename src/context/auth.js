import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import superagent from "superagent";

dotenv.config();
console.log(process.env.API_SERVER);
const API = "https://auth-server-401.herokuapp.com"; //process.env.API_SERVER;
const SECRET = "supersecret"; //process.env.JWT_SECRET;
export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setuser] = useState({});
  const [token, settoken] = useState("");

  useEffect(() => {
    const token = cookie.load("auth");
    validateToken(token);
  }, []);

  const validateToken = (token) => {
    try {
      const user = jwt.verify(token, SECRET);
      console.table(user);
      setLoginState(true, token, user);
    } catch (error) {
      setLoginState(false, null, {});
      console.log(`Token Validation Error ${error.message}`);
    }
  };
  const setLoginState = (loggedIn, token, user) => {
    cookie.save("auth", token);
    settoken(token);
    setloggedIn(loggedIn);
    setuser(user);
    //setState({ token, loggedIn, user });
  };
  const login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set("authorization", `Basic ${btoa(`${username}:${password}`)}`);
      validateToken(response.body.token);
    } catch (error) {
      console.error("Signin Error", error.message);
    }
  };
  const logout = () => {
    setLoginState(false, null, {});
  };

  const state = {
    loggedIn,
    login,
    logout,
    user,
    token,
  };

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
