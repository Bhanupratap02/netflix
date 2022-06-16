import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "./AuthActions"
export const login = async (user,dispatch) =>{
   dispatch(loginStart())

   try {
      const res = await axios.post("auth/login",user); 
      console.log(res);
     res.data.isAdmin && dispatch(loginSuccess(res.data))
      if (res.data.isAdmin && res.data.accessToken) {
        localStorage.setItem(
          "adminToken",
          JSON.stringify(res.data.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(res.data));
      }
   } catch (error) {
       dispatch(loginFailure())
       console.log(error);
   }
}