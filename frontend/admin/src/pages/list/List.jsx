import { Link,  useHistory, useLocation } from "react-router-dom";
import "./list.css";
import { useContext, useEffect, useState } from "react";
import {ListContext} from "../../context/listContext/ListContext"
import { updateList } from "../../context/listContext/apiCalls";
export default function List() {
    
     let history = useHistory()
     const {dispatch} = useContext(ListContext)
     const location = useLocation()
     const [list, setList] = useState(location.list)
    const [listToUpdate, setListToUpdate] = useState(null)

  
     const handleChange = (e) =>{
    const value = e.target.value;
    setListToUpdate({...listToUpdate,[e.target.name]:value})
  }
   
    
  const handleSubmit =(e) =>{
  e.preventDefault();
  if(listToUpdate !== null){
 updateList(listToUpdate,list._id,dispatch)
  history.push("/lists")
  }
 
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                 
                  <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span
                      className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">type:</span>
                      <span className="productInfoValue">{list.type}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List Title</label>
                  <input type="text" name="title" placeholder={list.title} onChange={handleChange} />
                   <label>Type</label>
                   <input type="text" name="year" placeholder={list.type}  onChange={handleChange}/>
                    <label>Genre</label>
                   <input type="text" name="genre" placeholder={list.genre}  onChange={handleChange}/>
              </div>
              <div className="productFormRight">
                    <button 
                     disabled={listToUpdate === null}
                    className="productButton"
                  onClick={handleSubmit}
                  >Update</button>
                  
              </div>
          </form>
      </div>
    </div>
  );
}
