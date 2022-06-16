import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import storage from "../../firebase"
import {MovieContext} from "../../context/movieContext/MovieContext"
import { updateMovie } from "../../context/movieContext/apiCalls";
export default function Product() {
    
     let history = useHistory()
     const {movie:movieFromContext,dispatch} = useContext(MovieContext)
     const location = useLocation()
    const [movie, setMovie] = useState(location.movie)
 
   
   
  
  const [uploaded, setUploaded] = useState(0)
 const [movieToUpdate, setMovieToUpdate] = useState(null)
  const [img1, setImg1] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgSm, setImgSm] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  
     const handleChange = (e) =>{
    const value = e.target.value;
    setMovieToUpdate({...movieToUpdate,[e.target.name]:value})
  }
   const upload = (items) =>{
    items.forEach(item =>{
      const fileName = new Date().getTime() + item.label+item.file.name 
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
      uploadTask.on("state_changed", snapshot =>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % done`);
      },(err)=>{ console.log(err)},()=>{
        uploadTask.snapshot.ref.getDownloadURL().then(url =>{
          setMovieToUpdate(prev => {
            return {...prev,[item.label]:url}
          })
          setUploaded(prev => prev + 1)
        })
      }
      
      );
    })  
  }
    const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img1, label: "img" },
    //   { file: imgTitle, label: "imgTitle" },
    //   { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
  const handleSubmit =(e) =>{
  e.preventDefault();
  if(movieToUpdate !== null){
 updateMovie(movieToUpdate,movie._id,dispatch)
  history.push("/movies")
  }
 
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span
                      className="productInfoValue">{movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year:</span>
                      <span className="productInfoValue">{movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey"> Age limit:</span>
                      <span className="productInfoValue">{movie.limit}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Movie Title</label>
                  <input type="text" name="title" placeholder={movie.title} onChange={handleChange} />
                   <label>Year</label>
                   <input type="text" name="year" placeholder={movie.year}  onChange={handleChange}/>
                    <label>Genre</label>
                   <input type="text" name="genre" placeholder={movie.genre}  onChange={handleChange}/>
                    <label>Age Limit</label>
                   <input type="text" name="limit" placeholder={movie.limit}  onChange={handleChange}/>
                    <label>Trailer</label>
                   <input type="file" name="trailer" placeholder={movie.trailer} onChange={ e => setTrailer(e.target.files[0])}/>
                    <label>Video</label>
                   <input type="file" name="video" placeholder={movie.video} onChange={e=>setVideo(e.target.files[0])} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={img1?img1:movie.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} name="img" onChange={e=> setImg1(e.target.files[0])}/>
                  </div>
                  
                  {img1 || trailer || video && uploaded !== 0 ?(
                     <button className="productButton"
                     onClick={handleUpload}
                     >Upload Media</button>
                  ):(<><button 
                     disabled={movieToUpdate === null}
                    className="productButton"
                  onClick={handleSubmit}
                  >Update</button></>)}
                  
              </div>
          </form>
      </div>
    </div>
  );
}
