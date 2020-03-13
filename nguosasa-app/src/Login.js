import React from 'react';

function Login() {
  return (
    <div className="mvls-container">
      <p>Please fill in your details below</p>
      <form
        action="api/customers"
        method="post"
        id="form"
        onsubmit="return validate_all('results');"
      >
        <table cellspacing="10">
          <tr>
            <td>Username</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="usename"
                maxlength="10"
                id="usename"
                onKeyUp="updatelength('usename', 'usename_length')"
              />
              <br />
              <div id="usename_length"></div>
            </td>
          </tr>

          <tr>
            <td>Password</td>
          </tr>
          <tr>
            <td>
              <input
                type="password"
                name="pass"
                maxlength="25"
                id="password"
                onKeyUp="updatelength('password', 'pass_length')"
              />
              <div id="pass_result"></div>
              <br />
              <div id="pass_length"></div>
            </td>
          </tr>

          <tr>
            <td colspan="2">
              <input type="submit" name="submit" value="Login" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default Login;
