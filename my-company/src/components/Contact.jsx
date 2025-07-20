import React, { useState } from 'react';

   function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '600px' };
  const inputStyle = { margin: '8px 0', padding: '8px', fontSize: '1em' };
  const buttonStyle = { padding: '10px', backgroundColor: '#4A7BD1', color: '#FFF', border: 'none', cursor: 'pointer', fontSize: '1em', borderRadius: '4px', marginTop: '10px' };

  const handleChange = e => {
   const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    alert(`Form submitted!\n\n${JSON.stringify(formData, null, 2)}`);
  };

     return (
       <div style={{ maxWidth:'1200px', margin:'0 auto', padding: '20px', }}>
         <h1>Contact Us</h1>
         <form onSubmit={handleSubmit} style={formStyle}>
           <input
             type="text"
             name="name"
             placeholder="Your Name"
             value={formData.name}
             onChange={handleChange}
             style={inputStyle}
             autoComplete='name'
           />
           <input
             type="email"
             name="email"
             placeholder="Your Email"
             value={formData.email}
             onChange={handleChange}
             style={inputStyle}
             autoComplete='email'
           />
           <textarea
             name="message"
             placeholder="Your Message"
             value={formData.message}
             onChange={handleChange}
             style={{ ...inputStyle, height: '120px' }}
           />
           <button type="submit" style={buttonStyle}>Send Message</button>
         </form>
       </div>
     );
   }

   export default Contact;