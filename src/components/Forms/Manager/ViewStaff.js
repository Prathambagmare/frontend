import React from 'react';
import './customTable.css'
import axios from 'axios'
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react'

import { UpdateStaffImpl } from './UpdateStaffImpl';
import { toast } from 'react-toastify';


export const ViewStaff = () => {

  let [staffId,setStaffId]=useState("");

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/auth-api/manager/manageStaff/viewStaffDetails",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
      }, []);

    const [products, setProducts] = useState([]);




    const removeProductById = (staffId) => {

      setProducts(products.filter((c) => c.staffId !== staffId));
  
    };




  

// const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow } = tableInstance
const [show,setShow]=useState(false);

function checkc(){
  let pop = document.getElementById("updateStaff")
  setShow(!show)
  show?pop.style.display="block":pop.style.display="none";
}


  return (
    <>
<UpdateStaffImpl staffId={staffId}></UpdateStaffImpl>


    <table className='main-table'>
        <thead>
        <th>
Staff Id
        </th>
        <th>
Full Name
        </th>
        <th>
Address
        </th>
        <th>
City
        </th>
        <th>
Country
        </th>
        <th>
Gender
        </th>
        <th>
Age
        </th>
        <th>
Phone Number
        </th>
        <th>
Gmail
        </th>
        <th>
         Update
        </th>
        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr key={item.staffId}>
            <td>{item.staffId}</td>
            <td>{item.fullName}</td>
          <td>{ item.address }</td>
          <td>{ item.city }</td>
          <td>{ item.country }</td>
          <td>{ item.gender }</td>
          <td>{ item.age }</td>
          <td>{ item.phoneNumber }</td>
          <td>{ item.gmail }</td>
          
          <td><button onClick={()=>{checkc();setStaffId(item.staffId);}}>Update</button>&nbsp;
        </td>
          
        </tr>
      );
    })}
  </tbody>

    </table>
   
       </>
  )
}