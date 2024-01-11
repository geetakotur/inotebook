import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const [cred, setcred] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    console.log(json);
    // Example inside handlesubmit function
if (json.success) {
  localStorage.setItem('token', json.authtoken);
  navigate("/home");
  alert("logged in successfully")
 
} else {
  alert("please try to login with correct credentials")
}

  };

  const handleChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            value={cred.email}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={cred.password}
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
