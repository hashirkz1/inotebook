import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate()
    const {ShowAlert} = props;
    const [credentials , setCredentials] = useState({email : "" , password : ""})
    const handleonChange = (e) =>{
        setCredentials({...credentials , [e.target.name] : e.target.value})
    }
    const handleOnSubmit = async(e) =>{
        e.preventDefault();
        // API CALL
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email : credentials.email , password : credentials.password}), // body data type must match "Content-Type" header
          });
          const json = await response.json(); 
          if(json.success){
            // redirect to home page
            localStorage.setItem('token' , json.authtoken)
            ShowAlert("User logged in successfully" , "success")
            navigate("/")

          }
          else{
            ShowAlert("Please use valid credentials" , "info")
          }
    }
  return (
    <div className='container'>
      <h2 className='my-3'>Login to Use myNotes</h2>
       <form className='my-2' onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleonChange}
            value = {credentials.email}
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
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
