import { useEffect, useState } from "react";
import "./widgetLg.css";
import axios from "axios";
export default function WidgetLg() {

  const [newMovie, setnewMovie] = useState([])
  const [error, seterror] = useState(null)
  useEffect(() => {
  const   getMovies = async () =>{
   try {
       const res = await axios.get("/movies?new=true",{
       headers:{
         token:`Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`
       },
     })
     setnewMovie(res.data)
    } catch (error) {
      seterror(error.response.data)
    }
    }
   getMovies()
   
  }, [])
 
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Comings</h3>
      <table className="widgetLgTable">
        <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Latest</th>
          <th className="widgetLgTh">IsSeries</th>
          <th className="widgetLgTh">Genre</th>
          <th className="widgetLgTh">Age Limit</th>
        </tr>
         {newMovie.map(movie =>(
    <tr key={movie._id} className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src={movie.img}
              className="widgetLgImg"
              alt=""
            />
            <span className="widgetLgName">{movie.title}</span>
          </td>
          <td className="widgetLgDate">{movie.isSeries}</td>
          <td className="widgetLgAmount">{movie.genre}</td>
          <td className="widgetLgStatus">
          {movie.limit}
          </td>
        </tr>
         ))}
        
        
       
        </tbody>
      </table>
    </div>
  );
}
