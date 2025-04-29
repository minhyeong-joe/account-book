import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><Link to="/">Account Book</Link></div>
      <ul className="navbar-links">
        <li><Link to="/">Transactions</Link></li>
        <li><Link to="/payment-methods">Payment Methods</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;