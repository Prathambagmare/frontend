import React, { useEffect, useState } from "react";
import './inputfield.css';
import '../forms.css'
import { InputField } from "../InputComponents/InputField";
import {useLocation, useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import "./Payment.css"
import { Stripe } from "react-stripe-checkout";



import axios from "axios";
import { toast } from "react-toastify";






export const ReservationAdd=(props)=>{
    let loc = useLocation()





//  for Room
    const[AdultPrice,setAdultPrice]=useState(0);
    const[ChildPrice,setChildPrice]=useState(0);
    // const[NoAdult,setNoAdult]=useState(0);
    const[NoChild,setNoChild]=useState(0);
    const[CheckIn,setCheckIn]=useState("");
    const[CheckOut,setCheckOut]=useState("");



//
const[ServiceTotal,setServiceTotal]=useState(0);


    const[RoomTotal,setRoomTotal]=useState(0);
 
    const[Total,setTotal]=useState(0);

    const[Paid,SetPaid] = useState(0);
    const[Balance,setBalance]=useState(0);


  

   
    
    const [list,setList] = useState({
        items: []
    })
 


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(() => {
        // No infinite loop
        try{
        axios.get("http://localhost:8180/inventory-api/manageInventory/viewInventory",config).then((response)=>{setItems(response.data)});
        console.log(items)
        }
        catch(error)
        {
          toast.error("Inventory Service Not Working")
        }
        setStripeDetails({...stripeDetails, token1  : localStorage.getItem("token1")});
        setStripeDetails({...stripeDetails, stripe  : window.Stripe(stripeApiToken)});
   
        // setState(count + 1);
      }, []);
    
    let[items,setItems] = useState([]);

     
 

    async function getRoom(roomNo){

        await  axios.get("http://localhost:8180/room-api/manageRooms/getRoom/"+roomNo,config).then(function(response){
            document.getElementById('roomType').value = response.data.roomType;
            document.getElementById('roomNo').value = response.data.roomNo;
        
            let status = response.data.status;
            if(!status){
                document.getElementById('status').value = "Available"
            }
           
        });
        


        
    }

 

     useEffect(() => {
        // No infinite loop
     
        if(loc.state != null){
        if(loc.state.room != null){
         getRoom(loc.state.room)
         }
        }
 
      }, [props]);

    

      async function getRoombyId(val) {

        if(val != null)
        {

            await  axios.get("http://localhost:8180/room-api/manageRooms/getRoom/"+val,config).then(function(response){
                document.getElementById('roomType').value = response.data.roomType;
                setAdultPrice(response.data.adultPrice);
                setChildPrice(response.data.childPrice);
                let status = response.data.status;
                if(!status){
                    document.getElementById('status').value = "Available"
                }
                else {
                    document.getElementById('status').value = "Unavailable"
                }
               
            });
            
        }
    }
      async function  getStaffbyId(val){

        if(val != null)
        {

        
                await  axios.get("http://localhost:8180/auth-api/receptionist/manageGuest/getGuest/"+val,config).then(function(response){
                    document.getElementById('fullName').value = response.data.fullName;
               document.getElementById('address').value = response.data.address;
               document.getElementById('phoneNumber').value = response.data.phoneNumber;
                   
                });
        
              
        
            }
        
            
        }

      
  
       
  
function addItem(){
    let quantity = document.getElementById('quantityAdded').value;
    let rol = document.getElementById('itemAdded');
    let ite = rol.options[rol.selectedIndex].value;
    let itemAdd = ite.split(','); 

    

    const itemss = list.items;

  itemss.push({itemName:itemAdd[0],quantity:quantity})
  setList({...list, items:itemss});

  setServiceTotal(ServiceTotal+(parseInt(itemAdd[1])*parseInt(quantity)))
    console.log(list);
}






function NoAdults(val)
{


    let date = new Date(CheckIn)
    let date2 = new Date(CheckOut)
     let diffDays = (date, date2) => Math.ceil(Math.abs(date - date2) / (1000 * 60 * 60 * 24));
       
let childprice = NoChild*ChildPrice*parseInt(diffDays(date,date2));
  let adultprice = parseInt(val)*AdultPrice*parseInt(diffDays(date,date2));

 setRoomTotal(childprice+adultprice);

}

const nav = useNavigate();

function addPayment()
{
  const cardno = document.getElementById('cardNumber').value;
  const cardhold = document.getElementById('cardHolder').value;
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const cvv = document.getElementById('cardNumber').value;

  if(cardno.length==0||cardhold.length==0||year.length==0||month.length==0||cvv.length==0)
{

    toast.error("Fields Cant be Empty");

}else{
  if((RoomTotal)>0){

makeReservation();

  toast.success("Payment Succesfull ");

  nav("../reception/successpayment")

  }
  else{
toast.error("Enter Valid Amount");
  }
}
}

// const [flip, setFlip] = useState(null);




function makeReservation(){

    
const reservationId = document.getElementById('reservationId').value
const guestId = document.getElementById('guestId').value
const roomNo = document.getElementById('roomNo').value

const itemName = list.items.map(({itemName, quantity}) => `${itemName},${quantity}`).join('|');
console.log(itemName)


const checkIn = CheckIn;
const checkOut = CheckOut;
const noOfChild = parseInt(document.getElementById('noOfChild').value);
const noOfAdult = parseInt(document.getElementById('noOfAdult').value);
const total = parseInt(document.getElementById('total').value);
const paid = parseInt(total);


let checky = []; 


checky.push({
    reservationId: reservationId,
    guestId: guestId,
    roomNo: roomNo,
    itemName: itemName,
    checkIn: checkIn,
    checkOut: checkOut,
    noOfChild: noOfChild,
    noOfAdult: noOfAdult,
    total: total,
    paid: paid,

})

localStorage.setItem("reservation",JSON.stringify(checky));




}




const [stripeDetails , setStripeDetails] = useState({
  stripeApiToken: 'pk_test_51KgW6ZSA7qXB0K48Gs27r4WDvwadH1Ne0YLsOrvuKfc5ufZv4TF1WVoDEHiiARkvulL7vYAqVrarFpARA3nGeRNS001nZdmfZU',
  stripe: '',
  token1: null
})
const {stripeApiToken , stripe ,token1} = stripeDetails;
let checkOutBodyArray = []; 


function paywithstripe()
{
  checkOutBodyArray = [];
  getItems();
  console.log(checkOutBodyArray);
  axios.post("http://localhost:8180/payment-api/paymentStripe/create-checkout-session" ,checkOutBodyArray,config)
      .then(
          (response) => { 
              localStorage.setItem("sessionId" , response.data.sessionId)
              console.log('session' , );
              makeReservation();
              stripe.redirectToCheckout({sessionId: response.data.sessionId})
          },
          (error) => {
              console.log(error);
          }
      )

}


const getItems = () => {
  // let orderId = JSON.parse(localStorage.getItem("payment")).orderId;
  // console.log(orderId);
  // let orders = (JSON.parse(localStorage.getItem("orders")).filter((order) => order.orderId === orderId));
  // let products = orders[0].product;
  //   products.map((product) => { 
    const total = parseInt(document.getElementById('total').value);
    const guestId = "" + document.getElementById('guestId').value

    const reservationId = ""+ document.getElementById('reservationId').value
  
        checkOutBodyArray.push({
            price: total,
            quantity: 1,
            productId: reservationId,
            productName: "Reservation",
            userId: guestId
        })
  //   })
}

    return(

<div>


        
        <div className="reservation-container">
            <div className="reservation-col1">

            <div className="reservation-room">
            <h3>Reservation</h3>
            <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{"Reservation Id"}</div>
            <input  id="reservationId" type="number"></input>
</div>
</div>
                <div className="reservation-guest">
                    <h3>Guest</h3>
            
                    <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{"Guest Id"}</div>
            <input label="Guest Id" type="number" id="guestId"  onChange={(e)=>{getStaffbyId(e.target.value)}}></input>
          
        </div>
                    <InputField label="Full Name" type="text" id="fullName"></InputField>
                    <InputField label="Phone Number" type="text" id="phoneNumber" maxLength="13"></InputField>
                    <InputField label="Address" type="text" id="address"></InputField>
                </div>
                <div className="reservation-payment">
                    <h3>Payment</h3>
                    <InputField label="Room Total" id="roomTotal" value={RoomTotal}></InputField>
                    <InputField label="Service Total" value={ServiceTotal} ></InputField>
                    <InputField label="Grand Total" id="total" value={RoomTotal+ServiceTotal} ></InputField>
                 

                    <Popup
    trigger={  <button id="paymentButton" className="payment-button" >Add Payment</button>}
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
                  placeholder="Please enter your credit card number" id="cardNumber"  maxLength="12"
                />
            

          
                <h2>Card Holder</h2>
                <input  type="text" placeholder="Please enter your full name" id="cardHolder" required maxLength="20"/>
           

            <div className="input-grp">
                <div className="input-container">
                    <h4>Expiration Year</h4>
                    <select id="year" >
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
                <select  id="month">
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
                    <input type="password" placeholder="CVV" required id="cvv" maxLength="3"/>
                </div>
            </div>

            <button onClick={()=>{
           
          
              addPayment()

            }}>
                Pay &#8377;{RoomTotal+ServiceTotal}</button>
                <button onClick={()=>{
           
           paywithstripe()

         }}>
             Pay with Stripe</button>
        
        </div>
    </div>
       
        </div>
      
      </div>
    )}
  </Popup>


                   
    
     

                </div>
            </div>

    


            <div className="reservation-col2">
                <div className="reservation-room">
                    <h3>Room</h3>
                    <InputField label="Room Type" type="text" id="roomType"></InputField>
                    {/* <InputField label="Room No." type="text" id="roomNo" ></InputField> */}
                    <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{"Room No"}</div>
            <input label="Room No." type="text" id="roomNo" onChange={(e)=>{getRoombyId(e.target.value)}}></input>
          
        </div>
                   
                    <InputField label="Room Status" type="text" id="status"></InputField>
            
                    <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{"Check In"}</div>
            <input label="Check In" type="date" id="checkIn" onChange={(e)=>{setCheckIn(e.target.value)}}></input>
          
        </div>
            
                    <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{"Check Out"}</div>
            <input label="Check Out" type="date" id="checkOut" onChange={(e)=>{setCheckOut(e.target.value)}}></input>
          
        </div>
               
                    
                        
                    <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{"No of Child"}</div>
            <input label="Number of Child" type="number" id="noOfChild" onChange={(e)=>{setNoChild(e.target.value)}}></input>
          
        </div>
                    <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{"No of Adult"}</div>
            <input label="number oF Adult" type="number" id="noOfAdult" onChange={(e)=>{NoAdults(e.target.value)}}></input>
          
        </div>
                </div>




                <div className="reservation-service">
                    <h3>Service</h3>
         
          <table className='main-table'>
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
   
    <div className="reservation-service">
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
<button  onClick={()=>{addItem()}}>Add Item</button>
          </div>

                </div>
            </div>

        </div>
        </div>
    )
    }