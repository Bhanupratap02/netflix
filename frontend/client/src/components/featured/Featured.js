import {Link} from "react-router-dom"
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import  "./Featured.scss"
//  const sampleimg1 ="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//  const titlesampleimag ="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
const Featured = ({type,setGenre}) => {
  const [content, setContent] = useState({})
  let video = content.video;
  useEffect(() => {
  const getRandomContent = async () => {
    try {
      const res = await axios.get(`movies/random?type=${type}`, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });  
        setContent(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  getRandomContent();
  }, [type])
  
 console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value={""}>Genre</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      )}

      <img
        src={content.img}
        alt=""
        style={{ maxWidth: "100%", width: "100%" }}
      />
      <div className="info">
        {/* {content.imgTitle ? (
          <img className="imgTitle" src={content.imgTitle} alt="" />
        ) : (
          <h1>{content.title}</h1>
        )} */}
        <h1 className="title">{content.title}</h1>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link Link to={`/watch`} state={{ video }} className="link">
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Featured