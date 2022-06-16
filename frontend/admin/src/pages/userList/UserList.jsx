import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../context/userContext/UserContext"
import {getUsers,deleteUser} from "../../context/userContext/apiCalls"

export default function UserList() {
  
  const {users,dispatch} = useContext(UserContext)
   useEffect(() => {
   getUsers(dispatch)
  }, [dispatch])
  console.log(users);

   const handleDelete = (id) => {
     deleteUser(id,dispatch)
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 260 },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic} alt="" />
            {params.row.email}
          </div>
        );
      },
    },
    { field: "createdAt", headerName: "Joined At", width: 200 },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r)=>r._id}
      />
    </div>
  );
}
