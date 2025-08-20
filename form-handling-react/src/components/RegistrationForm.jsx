import { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log({ username, email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      {errors.username && <div>{errors.username}</div>}

      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <div>{errors.email}</div>}

      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <div>{errors.password}</div>}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
