import React from 'react';
import './customTable.css'
import axios from 'axios'
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react'
import { AddRoom } from './AddRoom';
import { Text, UpdateRoomImpl } from './UpdateRoomImpl';
import { UpdateInventoryImpl } from './UpdateInventoryImpl';
import { toast } from 'react-toastify';


export const ViewInventory = () => {

  let [itemId,setItemId]=useState("");

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/inventory-api/manageInventory/viewInventory",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
      }, []);

    const [products, setProducts] = useState([]);




    const removeProductById = (itemId) => {

      setProducts(products.filter((c) => c.itemId !== itemId));
  
    };



function deleteItem(itemId){
  axios.delete("http://localhost:8180/inventory-api/manageInventory/deleteInventory/"+itemId,config).then((response)=>{toast.error("Inventory Deleted")});

}
  

// const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow } = tableInstance
const [show,setShow]=useState(false);

function checkc(){
  let pop = document.getElementById("inventory")
  setShow(!show)
  show?pop.style.display="block":pop.style.display="none";
}


  return (
    <>
<UpdateInventoryImpl itemId={itemId}></UpdateInventoryImpl>


    <table className='main-table'>
        <thead>
        <th>
Item Id
        </th>
        <th>
Item Name
        </th>
        <th>
Unit Price
        </th>
        <th>
Quantity
        </th>

<th>
         Update,Delete
        </th>
        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr key={item.itemId}>
            <td>{item.itemId}</td>
            <td>{item.itemName}</td>
          <td>{ item.unitPrice }</td>
          <td>{ item.quantity }</td>
      
          
          <td><button onClick={()=>{checkc();setItemId(item.itemId);}}>Update</button>&nbsp;
          <button  onClick={()=>{deleteItem(item.itemId);removeProductById(item.itemId);}}>Delete</button></td>
          
        </tr>
      );
    })}
  </tbody>

    </table>
   
       </>
  )
}