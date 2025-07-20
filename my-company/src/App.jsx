import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

 const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };
  return (
    <>
    <BrowserRouter>
      <div style={appStyle}>
        <Navbar />
        <div style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
     
    </>
  )
}

export default App
