import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AlertContext from "../context/alert/AlertContext";

const Login = () => {
    const [credentials, setCredentials] = useState({email : "", password: ""});
    let navigate = useNavigate();
    const context = useContext(AlertContext);
    const {showAlert} = context;

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const response = await fetch('http://192.168.0.168:8000/api/auth/login', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(credentials)
        });
        if(response.status !== 200){
            showAlert("warning","Invalid Credentials");
        } else {
            // Save the authToken and redirect
            const json = await response.json();
            localStorage.setItem('token', json.authToken);
            showAlert("success","Login Successful");
            navigate('/');
        }

    }
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
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
            onChange={onChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
