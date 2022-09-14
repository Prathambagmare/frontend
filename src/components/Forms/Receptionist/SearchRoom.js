import React from 'react';
import './customTable.css'
import axios from 'axios'

import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';




export const SearchRoom = () => {

  let [roomno,setRoomno]=useState("");

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/room-api/manageRooms/viewAvailableRooms",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
      }, []);

    const [products, setProducts] = useState([]);






   const nav = useNavigate();


function makeReservation(roomNo){
    nav("../reception/newreservation",{state:{room:roomNo}})
 
    // let pop = document.getElementById("reservation")
    // setShow(!show)
    // show?pop.style.display="block":pop.style.display="none";
}

const [show,setShow]=useState(false);




  return (
    <>
{/* <ReservationImpl roomNo={roomno}></ReservationImpl> */}


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
         Make Reservation
        </th>
        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr key={item.roomNo}>
            <td>{item.roomNo}</td>
            <td>{item.roomType}</td>
          <td>Available</td>
          <td>{ item.maxAllow }</td>
          <td>{ item.adultPrice }</td>
          <td>{ item.childPrice }</td>
          
          <td>
          <button  onClick={()=>{makeReservation(item.roomNo);setRoomno(item.roomNo)}}>Make Reservation</button></td>
          
        </tr>
      );
    })}
  </tbody>

    </table>
   
       </>
  )
}