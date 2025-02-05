import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

function Signup() {
    const context = useContext(AlertContext);
    const {showAlert} = context;
    const [credentials, setCredentials] = useState({name : "", email : "", password: ""});
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const response = await fetch('http://192.168.0.168:8000/api/auth/createuser', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(credentials)
        });
        if(response.status !== 200){
            showAlert("warning","Email already in use. Please use different email for signup");
        } else {
            // Save the authToken and redirect
            showAlert("success","Welcome to iNotebook");
            const json = await response.json();
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
    }
  return (
    <div className='container mt-4'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">
            Enter your Good Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            minLength={3}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
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
            minLength={5}
            onChange={onChange}
          />
        </div>
        
        <button  type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup;
