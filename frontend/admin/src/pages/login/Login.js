import React, { useContext, useState } from 'react'
import "./login.css"
import {AuthContext} from "../../context/authContext/AuthContext"
import { login } from '../../context/authContext/apiCalls'
const Login = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {isfetching,dispatch} = useContext(AuthContext)
  const handleLogin =(e)=>{
    e.preventDefault();
     login({email,password},dispatch);
 
   
  }
    const admintoken = localStorage.getItem("adminToken");

  return (
    <>
      <div className="conatiner">
        <div className="login">
          <form className="loginForm">
            <h2 className='loginTitle'>Login</h2>
            <h4 className='loginInfo'>
             This site is a private admin dashboard site
             <br/>
             If You are the admin then login here.
            </h4>
            <label className="label">
              <span>Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Email"
              className="loginInput"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label className="label">
              <span>Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="loginInput"
              onChange={e=>setPassword(e.target.value)}
            />

            <button onClick={handleLogin}
            disabled={isfetching}
            className="loginButton">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login