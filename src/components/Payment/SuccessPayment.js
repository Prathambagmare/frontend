import React, { useEffect } from "react"
import { useState } from "react"
import './Success.css'
import logo from '../../assets/checked.png';
import { toast } from "react-toastify";
import axios from "axios";



export const SuccessPayment=()=>{


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let [reservationId,sreservationId] = useState(0);
    let [guestId,sguestId] = useState(0);
    let [roomNo,sroomNo] = useState(0);
    let [itemName,sitemName] = useState("");
    let [checkIn,scheckIn] = useState("");
    let [checkOut,scheckOut] = useState("");
    let [noOfChild,snoOfChild] = useState(0);
    let [noOfAdult,snoOfAdult] = useState(0);
    let [total,stotal] = useState(0);


    useEffect(() => {
        try{
        var stringify = JSON.parse(localStorage.getItem("reservation"));
        for (var i = 0; i < stringify.length; i++) {
            sreservationId(stringify[i]['reservationId']);
            sguestId(stringify[i]['guestId']);
            sroomNo(stringify[i]['roomNo']);
            sitemName(stringify[i]['itemName']);
            scheckIn(stringify[i]['checkIn']);
            scheckOut(stringify[i]['checkOut']);
            snoOfChild(stringify[i]['noOfChild']);
            snoOfAdult(stringify[i]['noOfAdult']);
            stotal(stringify[i]['total']);
          
        }
    }
    catch(error)
    {
    toast.error("Invalid ")
    }
    
        

    })
    

  


   
 

   console.log(total)
  

   const paid = total;
    const balance = 0;
    const status = true;


 async function confirmReservation()
    {

        if(reservationId.length==0||guestId.length==0||roomNo.length==0||checkIn.length==0||checkOut.length==0||noOfAdult.length==0||total.length==0||paid.length==0)
       {

    toast.error("Fields Cant be Empty");

}else{



try{

    let transaction = "Succesfull";

await axios.post("http://localhost:8180/reservation-api/reservation/newReservation",{reservationId:reservationId,guestId:guestId,roomNo:roomNo,itemName:itemName,checkIn:checkIn,checkOut:checkOut,noOfChild:noOfChild,noOfAdult:noOfAdult,total:total,paid:paid,balance:balance,status:status},config).then((response)=>{toast.success("Reservation Added")}).catch((error)=>{toast.error("Not Added")});
await axios.get("http://localhost:8180/room-api/manageRooms/changeRoomStatus/"+roomNo,config);
await axios.post("http://localhost:8180/payment-api/payment/newStatement",{reservationId:reservationId,guestId:guestId,roomNo:roomNo,total:total,transaction:transaction},config);

localStorage.setItem("reservation",null);
}
catch(error)
{
  toast.error("Not Added")

}
}
    }
    
 
    return(
        <div className="maindiv">
         
         <h2>Transaction Succesfull</h2>
         <img className="checked" src={logo}></img>
         <div className="innerdiv">

        

         <h4>Reservation Id :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;   {reservationId}    </h4>
         <h4>Guest Id :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  {guestId}    </h4>
         <h4>Room No :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; {roomNo}    </h4>
         <h4>Check In :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  {checkIn}    </h4>
         <h4>Check Out :       &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;      {checkOut}    </h4>
         <h4>Grand Total :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  {total}    </h4>
         <h4>Paid :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; {paid}    </h4>
         <h4>Balance :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; {balance}    </h4>
        
         </div>
         <button onClick={confirmReservation}>Confirm Reservation</button>
             
        </div>
    )
}