import React, { useContext, useState } from "react";
import { If, Else, Then } from "react-if";
import { LoginContext } from "../../context/auth";
export default function Login(props) {
  const context = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    context.login(username, password);
  };

  return (
    <>
      <If condition={context.loggedIn}>
        <Then>
          <button onClick={context.logout}>Log Out</button>
        </Then>
        <Else>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Enter Username" />
            <input type="text" name="password" placeholder="Enter password" />
            <button>Login</button>
          </form>
        </Else>
      </If>
    </>
  );
}
