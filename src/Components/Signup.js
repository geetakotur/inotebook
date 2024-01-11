import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [cred, setcred] = useState({ name:"",email: "", password: "",confirmpassword:"" });
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:cred.name,email: cred.email, password: cred.password}),
    });
    const json = await response.json();
    console.log(json);
   // Example inside handlesubmit function
if (json.success) {
  localStorage.setItem('token', json.authtoken);
  navigate("/home");
  alert("signin successfull")
 
} else {
  alert("please try to add correct credentials")
}

  };
  const handleChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
        <h1>Signup</h1>
      <form onSubmit={handlesubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="Email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handleChange} minLength={5} required name="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">confirm Password</label>
    <input type="password" className="form-control" id="confirmpassword" onChange={handleChange} minLength={5} required name="confirmpassword"/>
  </div>
  
  <button type="submit"  className="btn btn-primary">Signup</button>
</form>
    </div>
  )
}
