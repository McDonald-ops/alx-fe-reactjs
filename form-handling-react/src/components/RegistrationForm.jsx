import { useState } from 'react';

/**
 * Controlled Registration Form:
 * - Uses useState to manage input values
 * - Basic front-end validation for empty fields and password length
 * - Shows inline error messages and a success notice
 */
function RegistrationForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // clear related error as user types
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setSuccess('');
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.email.trim()) e.email = 'Email is required';
    // simple email pattern
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate API call / registration
      console.log('Registering user (controlled):', form);

      // show success to user
      setSuccess('Registration successful (simulated). Check console for submitted data.');

      // Optionally reset form
      setForm({ username: '', email: '', password: '' });
    } else {
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <div className="p-2 text-green-800 bg-green-100 rounded">{success}</div>}

      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="Enter username"
        />
        {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="Enter a secure password"
        />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
      </div>

      <div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Register
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;
