
import List from "../components/list/List";
import Featured from "../components/featured/Featured";
import Navbar from "../components/navbar/Navbar"
import axios from "axios"
import "./Home.scss"
import { useEffect, useState } from "react";

const Home = ({type,user}) => {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)
  useEffect(() => {
   const getRandomLists = async ()=>{
     try {
       const res = await axios.get(
         `lists${type ? "?type=" +  type : ""}${genre ? "&genre=" + genre : ""}`,
         {
           headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
           },
         }
       );
       
       setLists(res.data)
     } catch (error) {
       console.log(error)
     }
   }
   getRandomLists()
  },[type,genre])
  
  return (
    <div className="home">
      <Navbar  user={user} setLists={setLists} setGenre={setGenre} />
     <Featured  type={type} setGenre={setGenre}/>
      {lists.map(list =>(
        <List list={list} />
      ))}
     
    </div>
  );
}

export default Home