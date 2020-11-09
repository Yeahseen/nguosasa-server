import React from 'react';

function Signup() {
  return (
    <div className="mvls-container">
      <div className="form-stripe">
        <h1>Please Sign up in the form below</h1>
        <form action="authreg" method="POST">
          <input
            className="input-stripe"
            type="text"
            name="Fullname"
            placeholder="Fullname"
            maxlenth="25"
            required
          ></input>
          <input
            className="input-stripe"
            type="text"
            name="Username"
            placeholder="Username"
            maxlenth="8"
            required="true"
          ></input>
          <input
            className="input-stripe"
            type="Password"
            name="Password"
            placeholder="Password"
            minlenth="8"
            required
          ></input>
          <input
            className="input-stripe"
            type="Password"
            name="Cpassword"
            placeholder="Confirm Password"
            minlenth="8"
            required
          ></input>

          <input
            className="input-stripe"
            type="address"
            name="Address"
            placeholder="Address"
            maxlenth="50"
            required
          ></input>

          <input
            className="input-stripe"
            type="number"
            name="Telephone"
            placeholder="Telephone"
            maxlenth="15"
            required
          ></input>

          <input
            className="input-stripe"
            type="text"
            name="Email"
            placeholder="Email"
            maxlenth="50"
            required
          ></input>
          <input className="button-stripe" type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default Signup;
