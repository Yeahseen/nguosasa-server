import React from 'react';
import { Link } from '@reach/router';

function NavBar() {
  return (
    <div className="mvls-container">
      <nav className="mvls-nav">
        <span className="mvls-title">Nguosasa</span>
        <span className="a">
          <Link to="/">Home</Link>
          <Link to="/Login">Login</Link>
          <Link to="/Signup">Sign Up</Link>
          <Link to="/Adminlogin">Admin</Link>
        </span>
      </nav>
    </div>
  );
}

export default NavBar;
