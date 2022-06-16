import { createMoviesFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMoviesFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions"
import axios from "axios"
// get all movies
export const  getMovies = async(dispatch) =>{
dispatch( getMoviesStart())
 try {
     const res = await axios.get("/movies",{
         headers:{
             token:`Bearer ${JSON.parse(localStorage.getItem("adminToken"))}` 
         }
     })
     dispatch(getMoviesSuccess(res.data))
     return "created";
 } catch (error) {
     dispatch(getMoviesFailure())
     console.log(error);
 }
 
}

// create a movie 
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
  const res =  await axios.post(`/movies`,movie ,{
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(createMoviesFailure());
    
  }
};
// update  a movie 
export const updateMovie = async (movie,id ,dispatch) => {
  dispatch(updateMovieStart());
  try {
  const res =  await axios.put(`/movies/${id}`,movie ,{
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateMoviesFailure());
    
  }
};
//delete a single movie
export const deleteMovie = async (id,dispatch) => {
  dispatch(deleteMovieStart());
  try {
   await axios.delete(`/movies/${id}`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure());
    console.log(error);
  }
};