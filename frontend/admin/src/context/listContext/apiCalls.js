
import axios from "axios"
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess, updateListFailure, updateListStart, updateListSuccess } from "./ListActions"
// get all lists
export const  getLists = async(dispatch) =>{
dispatch( getListsStart())
 try {
     const res = await axios.get("/lists",{
         headers:{
             token:`Bearer ${JSON.parse(localStorage.getItem("adminToken"))}` 
         }
     })
     dispatch(getListsSuccess(res.data))
 } catch (error) {
     dispatch(getListsFailure())
     console.log(error);
 }
 
}

// create a list
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
  const res =  await axios.post(`/lists`,list ,{
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    console.log(res);
    dispatch(createListSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(createListFailure());
    
  }
};
// update  a List
export const updateList = async (list,id ,dispatch) => {
  dispatch(updateListStart());
  try {
  const res =  await axios.put(`/lists/${id}`,list,{
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    console.log(res.data);
    dispatch(updateListSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateListFailure());
    
  }
};


//delete a single movie
export const deleteList = async (id,dispatch) => {
  dispatch(deleteListStart());
  try {
 await axios.delete(`/lists/${id}`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
 
    dispatch(deleteListSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(deleteListFailure());
    
  }
};