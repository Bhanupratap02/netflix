import { useContext, useEffect, useState } from "react";
import "./newList.css";
import {  getMovies } from "../../context/movieContext/apiCalls";
import {ListContext} from "../../context/listContext/ListContext"
import {MovieContext} from "../../context/movieContext/MovieContext"
import {  useHistory } from "react-router-dom";
import {Multiselect} from "multiselect-react-dropdown"
import { createList } from "../../context/listContext/apiCalls";
export default function NewList() {
  let history = useHistory()
  const {dispatch} = useContext(ListContext)
  const {movies,dispatch:movieDispatch} = useContext(MovieContext)
  let content = []
   const [title, setTile] = useState("")
   const [type, setType] = useState("")
   const [genre, setGenre] = useState("")
   const handleSelect = (selectedList, selectedItem,e) =>{
  content.push(selectedItem._id)
  }
  const handleRemove = (selectedList, removedItem) =>{
    // console.log(content,"before removed");
 content = content.filter(id => removedItem._id !== id )
//  console.log(content,"after removed");
  }
  useEffect(() => {
    getMovies(movieDispatch)
  }, [movieDispatch])
  
  
  const handleSubmit = (e) =>{
  e.preventDefault();
 let list = {title,type,genre,content}
   createList(list,dispatch)
   history.push("/lists")
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="formLeft">
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={(e)=>{setTile(e.target.value)}} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name="genre" onChange={(e)=>setGenre(e.target.value)}/>
        </div>
         <div className="addProductItem">
          <label>Type</label>
          <select name="type" onChange={(e)=>setType(e.target.value)}>
            <option>Type</option>
           <option value="movie">Movie</option>
           <option value="series">Series</option>
          </select>
        </div>
         
         </div>
         <div className="formRight">
        <div className="addProductItem">
          <label>Content</label>  
         <Multiselect
         selectionLimit="10"
         placeholder="Select Content..."
         options={movies} displayValue={"title"} 
         showCheckbox={true}
         onSelect={handleSelect}
         onRemove={handleRemove}
         name="content"
         />
 
        </div>
      
         </div>
           <button className="addProductButton"
      onClick={handleSubmit}
      >Create</button>
        
       
      </form>
     
    </div>
  );
}
