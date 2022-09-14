import React from 'react';
import './customTable.css'
import axios from 'axios'
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react'

import { UpdateUserImpl } from './UpdateUserImpl';
import { toast } from 'react-toastify';


export const ViewUsers = () => {

  let [username,setUsername]=useState("");

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/auth-api/owner/getUsers",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
      }, []);

    const [products, setProducts] = useState([]);




    const removeProductById = (username) => {

      setProducts(products.filter((c) => c.username !== username));
  
    };



    function deleteUser(username){
        axios.delete("http://localhost:8180/auth-api/owner/deleteUser/"+username,config).then((response)=>{toast.error("User Deleted")});
      
      }
  

// const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow } = tableInstance
const [show,setShow]=useState(false);

function checkc(){
  let pop = document.getElementById("updateUser")
  setShow(!show)
  show?pop.style.display="block":pop.style.display="none";
}


  return (
    <>
<UpdateUserImpl username={username}></UpdateUserImpl>


    <table className='main-table'>
        <thead>
        <th>
Username
        </th>
        <th>
Full Name
        </th>
        <th>
Role
        </th>
        <th>
Age
        </th>
        <th>
Gender
        </th>

        <th>
         Update,Delete
        </th>
        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr key={item.username}>
            <td>{item.username}</td>
            <td>{item.fullName}</td>
          <td>{ item.roles }</td>
          <td>{ item.age }</td>
          <td>{ item.gender }</td>

          
          <td><button onClick={()=>{checkc();setUsername(item.username);}}>Update</button>&nbsp;
          <button  onClick={()=>{deleteUser(item.username);removeProductById(item.username);}}>Delete</button></td>
          
        </tr>
      );
    })}
  </tbody>

    </table>
   
       </>
  )
}