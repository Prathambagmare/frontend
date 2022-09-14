import React from 'react';
import './customTable.css'
import axios from 'axios'
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react'
import { InputField } from "../InputComponents/InputField";
import { useNavigate } from 'react-router-dom';
import './inputfield.css';
import './ReservationUpdateCuston.css'
import { toast } from 'react-toastify';


export const ReservationEdit = () => {





  let [reservationId,setReservationId]=useState("");
  const[ServiceTotal,setServiceTotal]=useState(0);

  let token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };


    useEffect(() => {
        // No infinite loop
        axios.get("http://localhost:8180/reservation-api/reservation/getAllReservations",config).then((response)=>{ setProducts(response.data)})
        // setState(count + 1);
        axios.get("http://localhost:8180/inventory-api/manageInventory/viewInventory",config).then((response)=>{setItems(response.data)});
        console.log(items)

    

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


const cancleById = (reservationId) => {

    setProducts(products.filter((c) => c.reservationId !== reservationId));

  };



  function deleteReservation(reservationId){
      axios.delete("http://localhost:8180/reservation-api/reservation/cancelReservation/"+reservationId,config).then((response)=>{toast.error("Canceled")});
    
    }


    const [showDiv,setShowDiv]=useState(false);

    let[items,setItems] = useState([]);
    const [list,setList] = useState({
        items: []
    })
 

    function addItem(){
        let quantity = document.getElementById('quantityAdded').value;
        let rol = document.getElementById('itemAdded');
        let ite = rol.options[rol.selectedIndex].value;
        let itemAdd = ite.split(','); 
    
        
    
        const itemss = list.items;
    
      itemss.push({itemName:itemAdd[0],quantity:quantity})
      setList({...list, items:itemss});
    
      setServiceTotal(ServiceTotal+(parseInt(itemAdd[1])*parseInt(quantity)))
       
    }

   async function updateReservation(){








      const reservationId = parseInt(document.getElementById("resId").value);
      const total = ServiceTotal;
      const itemName = list.items.map(({itemName, quantity}) => `${itemName},${quantity}`).join('|');

     await axios.put("http://localhost:8180/reservation-api/reservation/updateReservationDetails/"+reservationId,{itemName:itemName,total:total},config)
     toast.success("Payment Succesfull ");
      setList({items: []});
    }
  
  
  

  return (
    <>
{/* <ReservationImpl roomNo={roomno}></ReservationImpl> */}


    <table className='main-table'>
        <thead>
        <th>
Reservation Id
        </th>
        <th>
Guest Id
        </th>
        <th>
Room No
        </th>
        <th>
Check In
        </th>
        <th>
Check Out
        </th>

        <th>
Total
        </th>
        <th>
Paid
        </th>
        <th>
Balance
        </th>
        <th>
Status
        </th>
        <th>
         Edit,Cancel
        </th>
        </thead>

    <tbody>
    {products.map(item => {
      return (
        <tr key={item.reservationId}>
            <td>{item.reservationId}</td>
            <td>{item.guestId}</td>
          <td>{ item.roomNo }</td>
          <td>{ item.checkIn }</td>
          <td>{ item.checkOut }</td>
          <td>{ item.total }</td>
          <td>{ item.paid }</td>
          <td>{ item.balance }</td>
          <td>{ item.status?"Active":"Expire" }</td>
          
        
          <td>
              

          <Popup
    trigger={  <button>Edit</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
      
        <div className="main-payment">
        <div className="container">
        <div id="form">

        <InputField label="Reservation Id" id="resId" value={item.reservationId} ></InputField>
        <InputField label="Guest Id" id="balance" value={item.guestId} ></InputField>
        <InputField label="Room No" id="balance" value={item.roomNo} ></InputField>

        
        <div className="service-pop">
                    <h3>Service</h3>
         
          <table className='main-table2'>
        <thead>
        <th>
ItemName
        </th>
        <th>
Quantity
        </th>
   
    
        </thead>

    <tbody>
    {list.items.map(item => {
      return (
        <tr >
            <td>{item.itemName}</td>
            <td>{item.quantity}</td>
    
                  
        </tr>
      );
    })}
  </tbody>

    </table>
   
    
    <select id="itemAdded"
//     onChange={(e) => {  setProduct({ ...Product, category: e.target.value });

// }}

>

<option selected="selected">Select Item</option>

{items.length > 0

    ? items.map((item) => (

    

    <option key={item.itemId}  >

      {item.itemName},{item.unitPrice}

    </option>

  ))  

: "No Item Found"

}

</select>

<input id="quantityAdded" type="number"></input>
<div className='custom-button'  onClick={()=>{addItem()}}>Add Item</div>

<InputField label="Service Total" id="serviceTotal" value={ServiceTotal} ></InputField>

<Popup
    trigger={  <button >Make Payment</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
      
        <div className="main-payment">
        <div className="container">
        <div id="form">
           

            
                <h2>Card Number</h2>
                <input type="text"
                  placeholder="Please enter your credit card number"
                />
            

          
                <h2>Card Holder</h2>
                <input  type="text" placeholder="Please enter your full name" required/>
           

            <div className="input-grp">
                <div className="input-container">
                    <h4>Expiration Year</h4>
                    <select  >
                    <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                     
                    </select>
                </div>
                <div className="input-container">
                <h4>Month</h4>
                <select  >
                <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                </div>
                <div className="input-container">
                    <h4>CVV</h4>
                    <input type="password" placeholder="CVV" required/>
                </div>
            </div>

            <button onClick={()=>{
           
              updateReservation()

            }}>
                Pay &#8377;{ServiceTotal}</button>
           </div>
    </div>
       
        </div>
      
      </div>
    )}
  </Popup>


          </div>

                </div>
        </div>
    </div>
  
        </div>
      
    
    )}
   
  </Popup>
  &nbsp;

          <button  onClick={()=>{deleteReservation(item.reservationId);cancleById(item.reservationId);}}>Cancel</button></td>
        </tr>
      );
    })}
  </tbody>

    </table>
   
       </>
  )
}