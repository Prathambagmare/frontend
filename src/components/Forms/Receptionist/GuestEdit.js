import React from 'react';
import './customTable.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { UpdateGuestImpl } from './UpdateGuestImpl';
import { toast } from 'react-toastify';




export const GuestEdit = () => {

  let [guestId,setGuestId]=useState("");

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/auth-api/receptionist/manageGuest/viewGuestDetails",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
      }, []);

    const [products, setProducts] = useState([]);




    const removeProductById = (guestId) => {

      setProducts(products.filter((c) => c.guestId !== guestId));
  
    };



    function deleteGuest(guestId){
        axios.delete("http://localhost:8180/auth-api/receptionist/manageGuest/deleteGuest/"+guestId,config).then((response)=>{toast.error("Guest Deleted")});
      
      }

  

// const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow } = tableInstance
const [show,setShow]=useState(false);

function checkc(){
  let pop = document.getElementById("updateGuest")
  setShow(!show)
  show?pop.style.display="block":pop.style.display="none";
}


  return (
    <>
     <UpdateGuestImpl guestId={guestId}></UpdateGuestImpl>

    <table className='main-table'>
        <thead>
        <th>
Guest Id
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
Phone Number
        </th>
        <th>
Gmail
        </th>
        <th>
         Update,Delete
        </th>
        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr key={item.guestId}>
            <td>{item.guestId}</td>
            <td>{item.fullName}</td>
          <td>{ item.address }</td>
          <td>{ item.city }</td>
          <td>{ item.country }</td>
          <td>{ item.gender }</td>
          <td>{ item.phoneNumber }</td>
          <td>{ item.gmail }</td>
          
          <td><button onClick={()=>{checkc();setGuestId(item.guestId);}}>Update</button>&nbsp;
          <button  onClick={()=>{deleteGuest(item.guestId);removeProductById(item.guestId);}}>Delete</button></td>
          
        </tr>
      );
    })}
  </tbody>

    </table>



       </>
  )
}