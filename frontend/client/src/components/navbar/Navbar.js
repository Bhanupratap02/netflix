import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss"
import {AuthContext} from "../../authContext/AuthContext"
import {logout} from "../../authContext/AuthActions"
import axios from "axios";
const Navbar = ({ user ,setGenre,setLists}) => {
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  

 
   
    
 
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link className="navbarmainLinks link" to={"/"}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>

          <Link to="/" className="link">
            <span
              onClick={() => {
                setGenre(null);
              }}
            >
              Home
            </span>
          </Link>
          <Link
            onClick={() => {
              setGenre(null);
            }}
            to="/series"
            className="link"
          >
            <span className="navbarmainLinks">TV Shows</span>
          </Link>
          <Link
            onClick={() => {
              setGenre(null);
            }}
            to="/movies"
            className="link"
          >
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span
            onClick={() => {
              setGenre("trending");
            }}
          >
            Latest
          </span>
        </div>
        <div className="right">
          <Search className="icon" />
          {/* <span>KID</span> */}
          {/* <Notifications className="icon" /> */}
          <img src={user.profilePic} alt="" />
          <div className="profile">
            <ArrowDropDown className="navbarmainLinks icon" />
            <div className="options">
              {/* <span>Setting</span> */}
              <span
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar