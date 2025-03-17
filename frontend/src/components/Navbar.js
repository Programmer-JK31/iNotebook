import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from './Alert'
import AlertContext from '../context/alert/AlertContext'

const Navbar = () => {
  const context = useContext(AlertContext);
  const {alert} = context;
  let navigate = useNavigate();
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
            </li>
        </ul>
        {localStorage.getItem('token') ? 
          <button 
          className="btn-btn-primary"
          onClick={() => {
            localStorage.removeItem('token',null);
            navigate('/login');
          }}>
            Logout
          </button> :
          <div className="d-flex">
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </div>
        }
        </div>
    </div>
    </nav>
    <Alert alert = {alert}/>
    </>
  )
}

export default Navbar
