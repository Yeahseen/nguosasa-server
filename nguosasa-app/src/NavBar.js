import React from 'react';
import { Link } from '@reach/router';

function NavBar() {
  return (
    <div className="mvls-container">
      <nav className="mvls-nav">
        <span className="mvls-title">Nguosasa</span>
        <Link to="/">Movies</Link>
        <Link to="/cinemas">Cinemas</Link>
        <Link to="/MovieDetails">Details</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </div>
  );
}

export default NavBar;
