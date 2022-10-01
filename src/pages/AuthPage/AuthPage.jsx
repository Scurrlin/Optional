import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import cryptoService from "../../utils/cryptoService";
import Navbar from "../../components/Navbar/Navbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



export default function LoginPage({ handleSignUpOrLogin }) {

  //============STATE=======================

  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate()

  //=========FUNCTIONS==============================

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  //--------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await userService.login(state);
      await cryptoService.createSession();
      console.log("TMDB session ID", localStorage.getItem("tmdb_session_id"))

      handleSignUpOrLogin();
      navigate('/')
    }catch(err){
      console.log(err)
      setError(err.message);
    }
  }

  //=====================================================


  return (
    <>
    <Navbar />
    <div className="form-container">
    <form onSubmit={handleSubmit} className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Log In</h3>
        
       
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type='email'
            name='email'
            value={state.email}
            onChange={handleChange}
            className="form-control mt-1"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            name= 'password'
            type="password"
            value={state.password}
            onChange={handleChange}
            className="form-control mt-1"
            placeholder="Password"
            required
          />
        </div>
        
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </div>
      
      </div>
    </form>
  </div>
  </>
  );
}