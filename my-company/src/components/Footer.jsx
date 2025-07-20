import React from 'react';

function Footer() {
  const style = {
    padding: '15px 20px',
    backgroundColor: '#2A5C9E',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 'auto'
  };
  return (
    <footer style={style}>
      © {new Date().getFullYear()} My Company. All rights reserved.
    </footer>
  );
}

export default Footer;
