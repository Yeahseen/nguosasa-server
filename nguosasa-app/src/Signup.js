import React from 'react';

function Signup() {
  return (
    <div className="mvls-container">
      <p>
        Alredy Register? <a href="/Login"> login </a>
      </p>
      <div className="login-form">
        <h1>Please Sign up in the form below</h1>
        <form action="authreg" method="POST">
          <input
            type="text"
            name="Fullname"
            placeholder="Fullname"
            autoComplete="off"
            maxlenth="25"
            required="true"
          ></input>

          <input
            type="text"
            name="Username"
            placeholder="Username"
            minlenth="8"
            required="true"
          ></input>
          <input
            type="Password"
            name="Password"
            placeholder="Password"
            minlenth="8"
            required="true"
          ></input>
          <input
            type="Password"
            name="Cpassword"
            placeholder="Confirm Password"
            minlenth="8"
            required="true"
          ></input>

          <input
            type="address"
            name="Address"
            placeholder="Address"
            maxlenth="50"
            required="true"
          ></input>

          <input
            type="number"
            name="Telephone"
            placeholder="Telephone"
            maxlenth="15"
            required=" true"
          ></input>

          <input
            type="text"
            name="Email"
            placeholder="Email"
            maxlenth="50"
            required="true"
          ></input>
          <input className="button" type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default Signup;
