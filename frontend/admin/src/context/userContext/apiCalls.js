/** @format */

import {
 
    createUserFailure,
    createUserStart,
    createUserSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFailure,
  getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess,
 
} from "./UserActions";
import axios from "axios";
// get all movies
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
      console.log(error);
    dispatch(getUsersFailure());
    
  }
};
// update  a movie
export const updateUser = async (user, id, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`/users/${id}`,user, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateUserFailure());
  }
};
//delete a single movie
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`/users/${id}`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
    console.log(error);
  }
};
