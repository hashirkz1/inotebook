import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });
  const handleonChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const {name , email ,password , c_password} = credentials
    if (password === c_password) {
      // API Call
      const response = await fetch(
        `http://localhost:5000/api/auth/createuser`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name , email , password}), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
    //   console.log(json)
      if (json.success) {
        // save authtoken and redirect to home page
        localStorage.getItem("token", json.authtoken);
        navigate("/");
        props.ShowAlert("Signed in successfully" , "success")
      } else {
        props.ShowAlert("Please use valid details" , "danger")
      }
    } else {
      props.ShowAlert("Please enter same password" , "info")
    }
  };
  return (
    <div className='container'>
      <h2 className="my-3">Create an account to continue</h2>
      <form className="my-2" onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Good Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleonChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleonChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleonChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="c_password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="c_password"
            name="c_password"
            onChange={handleonChange}
            minLength={5}
          />
        </div>
        <button disabled={credentials.password.length<5 || credentials.c_password.length<5} type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
