import React from 'react';

function Signup() {
  return (
    <div className="mvls-container">
      <form
        action="index.php"
        method="post"
        id="form"
        onsubmit="return validate_all('results');"
      >
        <table cellspacing="10">
          <tr>
            <td>Full Name</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="fullname"
                maxlength="25"
                id="fullname"
                onKeyUp="updatelength('fullname', 'fullname_length')"
              />
              <br />
              <div id="fullname_length"></div>
            </td>
          </tr>

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
            <td>Confirm Password</td>
          </tr>
          <tr>
            <td>
              <input
                type="password"
                name="cpass"
                maxlength="25"
                id="c_password"
              />
            </td>
          </tr>

          <tr>
            <td>Telephone</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="phone"
                maxlength="14"
                id="phone"
                onkeyup="updatelength('phone', 'phone_length')"
              />
            </td>
          </tr>

          <tr>
            <td>Email</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="email"
                maxlength="50"
                id="email"
                onKeyUp="updatelength('email', 'email_length')"
              />
              <br />
              <div id="email_length"></div>
            </td>
          </tr>

          <tr>
            <td colspan="2">
              <input type="submit" name="submit" value="Register" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default Signup;
