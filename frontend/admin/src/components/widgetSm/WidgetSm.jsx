import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios"
export default function WidgetSm() {
  const [newUser, setnewUser] = useState([])
  useEffect(() => {
  const getnewUser = async () => {
   try {
     const res = await axios.get("/users?new=true",{
       headers:{
         token:`Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`
       },
     })
    setnewUser(res.data)
   } catch (error) {
     console.log(error);
   }
  }
    getnewUser()
  }, [])
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">

        {newUser.map((user)=>(
        <li className="widgetSmListItem">
          <img
          src={
                user.profilePic ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.email}</span>
          </div>
         
        </li>
        ))}
        
      </ul>
    </div>
  );
}
