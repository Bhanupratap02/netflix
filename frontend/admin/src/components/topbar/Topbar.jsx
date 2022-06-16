import React from "react";
import "./topbar.css";
import { ExitToApp} from "@material-ui/icons";
import {logout} from "../../context/authContext/AuthActions"
import {useHistory} from "react-router-dom"
import {AuthContext} from "../../context/authContext/AuthContext"
import { useContext } from "react";
export default function Topbar() {
  let history = useHistory()
    const {dispatch} = useContext(AuthContext)
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer"
          style={{display:"flex",flexDirection:"row"}}
          >
            <h3 style={{paddingRight:"10px"}}
            onClick={()=>{
                localStorage.removeItem("user")
                localStorage.removeItem("adminToken")
                dispatch(logout())
                history("/login")
              }}
            >logout</h3>
            <ExitToApp />
          </div>
        </div>
      </div>
    </div>
  );
}
