import React from 'react';

function Login() {
  return (
    <div className="mvls-container">
      <div className="login-form">
        <h1> Login Form</h1>
        <form action="auth" method="POST">
          <input
            type="text"
            name="username"
            placeholder="username"
            required="true"
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            required="true"
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default Login;
