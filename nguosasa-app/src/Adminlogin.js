import React from 'react';

function Login() {
  return (
    <div className="mvls-container">
      <div className="login-form">
        <h1> Login Form</h1>
        <p>login as Admin</p>
        <form action="authAdmin" method="POST">
          <input
            type="text"
            name="username"
            placeholder="username"
            required
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default Login;
