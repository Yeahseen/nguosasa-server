import React from 'react';
import { Link } from '@reach/router';

function NavBar() {
  return (
    <div className="mvls-container">
      <nav className="mvls-nav">
        <span className="mvls-title">Nguosasa</span>
        <Link to="/">Home</Link>
        <Link to="/Signup">Register</Link>
        <Link to="/Cart">Cart</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Admin">Admin</Link>
      </nav>
    </div>
  );
}

export default NavBar;
