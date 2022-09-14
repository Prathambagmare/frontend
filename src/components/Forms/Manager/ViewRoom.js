import React from 'react';
import './customTable.css'
import axios from 'axios'
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react'
import { AddRoom } from './AddRoom';
import { Text, UpdateRoomImpl } from './UpdateRoomImpl';
import { toast } from 'react-toastify';


export const ViewRoom = () => {

  let [roomno,setRoomno]=useState("");

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/room-api/manageRooms/viewRooms",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
      }, []);

    const [products, setProducts] = useState([]);




    const removeProductById = (roomNo) => {

      setProducts(products.filter((c) => c.roomNo !== roomNo));
  
    };



function deleteUser(roomNo){
  axios.delete("http://localhost:8180/room-api/manageRooms/deleteRoom/"+roomNo,config).then((response)=>{toast.error("Room Deleted")});

}
  

// const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow } = tableInstance
const [show,setShow]=useState(false);

function checkc(){
  let pop = document.getElementById("awe")
  setShow(!show)
  show?pop.style.display="block":pop.style.display="none";
}


  return (
    <>
<UpdateRoomImpl roomNo={roomno}></UpdateRoomImpl>


    <table className='main-table'>
        <thead>
        <th>
Room No
        </th>
        <th>
Room Type
        </th>
        <th>
Book Status
        </th>
        <th>
Max Allowed
        </th>
        <th>
Adult Price
        </th>
        <th>
Child Price
        </th>
        <th>
         Update,Delete
        </th>
        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr key={item.roomNo}>
            <td>{item.roomNo}</td>
            <td>{item.roomType}</td>
          <td>{ (item.status)?"Unavailable":"Available" }</td>
          <td>{ item.maxAllow }</td>
          <td>{ item.adultPrice }</td>
          <td>{ item.childPrice }</td>
          
          <td><button onClick={()=>{checkc();setRoomno(item.roomNo);}}>Update</button>&nbsp;
          <button  onClick={()=>{deleteUser(item.roomNo);removeProductById(item.roomNo);}}>Delete</button></td>
          
        </tr>
      );
    })}
  </tbody>

    </table>
   
       </>
  )
}