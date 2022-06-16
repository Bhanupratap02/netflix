import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  PlayCircleOutline,
  ListAlt,
  Movie,
  ListAltTwoTone,
} from "@material-ui/icons";
import { Link, Route, useLocation, useParams } from "react-router-dom";


export default function Sidebar() {
  let location = useLocation()
  let active = "";
  const handleClick = (route) =>{
   if(location.pathname === route){
     active = route
   }
  }
  const isActive = (route) => {
    console.log(location.pathname === route);
   return  location.pathname === route;}
 
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul  className="sidebarList">
            <Link  to="/" className="link">
            <li     className="sidebarListItem">
              <LineStyle  className="sidebarIcon" />
               Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3  className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li       className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
            <li className="sidebarListItem">
              <ListAlt className="sidebarIcon" />
               Lists
            </li>
            </Link>
          </ul>
        </div>
       
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Create New</h3>
          <ul className="sidebarList">
            <Link  to="/newProduct" className="link">
             <li className="sidebarListItem">
              <Movie className="sidebarIcon" />
               Movie
            </li>
            </Link>
           <Link to="/newList" className="link">
             <li className="sidebarListItem">
              <ListAltTwoTone className="sidebarIcon" />
              List
            </li>
           </Link>
           
          </ul>
        </div>
      </div>
    </div>
  );
}
