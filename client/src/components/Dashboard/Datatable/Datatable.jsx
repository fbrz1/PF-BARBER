import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "./datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUsers } from '../../../redux/actions';
import Swal from "sweetalert2";


const Datatable = () => {
  const dispatch = useDispatch()
  const users = useSelector((state)=> state.users)

  console.log(users)

  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  // const handleDelete = (id) => {
  //   dispatch(deleteUsers(id))
  //   console.log(id)
  // };

  let handleDelete = (id, showDialog) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        showDialog.isActive = false
        dispatch(updateUsers(users, showDialog))
      }
      getUsers()
      getUsers()
    }
    )
    getUsers()


  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/dash/users/${params.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      
<div className="rows">

</div>


      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
   
      /> 
    </div>
  );
};

export default Datatable;
