// import {useEffect,useState} from "react";

// export default function GetData(){

//     const[userData,setUserData]=useState([]);
//     const  [loading,setLoading]=useState(false)
//     useEffect (()=>{
//         setLoading(true)
//         getUsersData();
//     },[])

//     const getUsersData=async()=>{
//         const url="http://localhost:7000/api/user";
//         let response = await fetch (url);
//         response = await response.json()
//         console.log(response);
//         setUserData(response)
//         setLoading(false)
//     }

      
//     return(

//           <>
//              <a className="font-bold text-3xl border border-black bg-yellow-400" href="/putdata">add new user</a>


//           <h1>integrate Data</h1>

//           {
//             !loading?
//              userData.map((user)=>(
//                 <ul key={user.name}>
//                     <li>{user.name}</li>
//                     <li>{user.age}</li>
//                     <li>{user.email}</li>
//                 </ul>
//             ))
//             :<h1>Data Loading...</h1>
//           }

//           </>


//     )

    
// }         



import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for DELETE request
import { Link } from "react-router-dom"; // For navigation to edit form

export default function GetData() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      const url = "http://localhost:7000/api/user";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7000/api/user/${id}`);
      if (response.status === 200) {
        alert("User deleted successfully");
        setUserData(userData.filter((user) => user.id !== id)); // Update state to remove deleted user
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user: " + (error.response?.data || error.message));
    }
  };




  return (
    <>
      <Link
        className="font-bold text-3xl border border-black bg-yellow-400"
        to="/putdata"
      >
        Add New User
      </Link>

      Fielding: inherit !important;
      <h1>Integrate Data</h1>

      {loading ? (
        <h1>Data Loading...</h1>
      ) : (
        userData.map((user) => (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>
              <Link to={`/putdata/${user.id}`}>Edit</Link>
              <button
                onClick={() => deleteUser(user.id)}
                className="ml-2 text-red-500"
              >
                Delete
              </button>
            </li>
          </ul>
        ))
      )}
    </>
  );
}