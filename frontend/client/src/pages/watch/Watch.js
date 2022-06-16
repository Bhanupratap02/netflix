import { ArrowBackOutlined } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { Link, useLocation, useParams} from "react-router-dom";
import "./Watch.scss"
const video = "https://www.appsloveworld.com/wp-content/uploads/2018/10/640.mp4"
const Watch = () => {
  const location = useLocation()
 const movie = location.state.video
  const [isLink, setIsLink] = useState(true);
 console.log(movie);
 useEffect(() => {
   if (movie.includes("https://www.youtube")) {
     setIsLink(true);
   } else {
     setIsLink(false);
   }
 }, [movie])
 

 console.log(isLink);
  return (
    <div className="watch">
      <Link to="/" className="link">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      {isLink ? (
        <embed
          className="video"
          autoPlay
          progress="true"
          controls
          src={movie}
        />
      ) : (
         <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie}
      /> 
        
      )}
    </div>
  );
}

     


export default Watch

      
