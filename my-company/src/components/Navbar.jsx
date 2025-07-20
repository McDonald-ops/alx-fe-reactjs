import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    padding: '10px 20px',
    backgroundColor: '#4A7BD1',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const linkStyle = {
    color: '#FFF',
    textDecoration: 'none',
    margin: '0 10px',
    fontWeight: 'bold'
  };
  const logoStyle = { color: '#FFF', fontSize: '1.2em', fontWeight: 'bold' };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>My Company</div>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
