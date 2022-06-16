import { Badge, Button } from "@material-ui/core";
import { BugReportTwoTone } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Register.scss"

const Register = () => {
  let navigate =  useNavigate()
  const [email ,setEmail]= useState(null)
  const [password ,setPassword]= useState("")
  const emailRef = useRef()
  const passwordRef = useRef()



  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  
    const handleFinish = async(e) => {
       e.preventDefault();
      try {
         if(email !== "" && password !== ""){
            await axios.post("auth/register", { email, password });
                navigate("/login");
         }
   
      } catch (error) {
        console.log(error);
        setEmail(null)
        setPassword(null)
    
      }
     
    }
    const handleNaviagte = () =>{
  navigate("/login")
    }
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies , TV shows , and more </h1>
        <h2>Watch anymore . Cancel anytime</h2>
        <p>
          Ready to watch ? Enter your email to create or restart your account
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButtton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
              ref={passwordRef}
            />
            <button className="registerButtton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}

        <Link
          to={"/login"}
          style={{ position: "relative", top: "-450px", right: "-38%" }}
        >
          <button
            onClick={handleNaviagte}
            style={{ overflow: "hidden" }}
            className="loginButton"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
        }

export default Register