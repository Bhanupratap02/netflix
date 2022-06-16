import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./ListItem.scss"
import axios from "axios";
import { Link } from "react-router-dom";
const trailer =
  "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
const image =
  "https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee";
const ListItem = ({index,item}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [isLink, setIsLink] = useState(true);
  let videoLink = movie.trailer;
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
        if (videoLink.includes("https://www.youtube")) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item, videoLink]);

  const video = movie.video;
  return (
    <Link to={`/watch`} state={{ video }} className="link">
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            {isLink ? (
              <embed
                className="video"
                src={movie.trailer}
                autoPlay={true}
                loop
              />
            ) : (
              <video
                className="video"
                src={movie.trailer}
                autoPlay={true}
                loop
              />
            )}

            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}+</span>
                <span>{movie.year}</span>
              </div>
              <div className="genre">{movie.genre}</div>
              <div className="desc">{movie.desc}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default ListItem


 
