import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import './IssueBill.css'




export const IssueBill=()=>{

    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    
    let [reservationId,sreservationId] = useState(0);
    let [guestId,sguestId] = useState(0);
    let [roomNo,sroomNo] = useState(0);
    let [statementId,sstatementId] = useState("");
    let [date,sdate] = useState("");
    let [transaction,stransaction] = useState("");
   
    let [total,stotal] = useState(0);



  async  function searchreservation()
    {
        let reserId = document.getElementById("reservationIdd").value
        if(reserId.length == 0)
        {
            toast.error("Reservation Id Can't be Empty");
        }
        else{

            await axios.get("http://localhost:8180/payment-api/payment/statements/"+reserId,config).then((response)=>{
                sreservationId(response.data.reservationId);
                sguestId(response.data.guestId);
                sstatementId(response.data.statementId);
                sdate(response.data.date);
                sroomNo(response.data.roomNo);
                stransaction(response.data.transaction);
                stotal(response.data.total);




            })

        }

    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content:()=> componentRef.current
    });


    // function printDiv(){
    //     var printContents = document.getElementById('printMe').innerHTML;
    //     var originalContents = document.body.innerHTML;

    //     document.body.innerHTML = printContents;

    //     window.print();

    //     document.body.innerHTML = originalContents;
    // }


    return(
        <div className="issueBill-main">
            <div>
          <h3>Reservation Id</h3>
          <input id="reservationIdd" placeholder="Enter Reservation Id"></input>
          <button className="search-btn" onClick={searchreservation}>Search</button>
          </div>

          <div className="bill-innerdiv" ref={componentRef}>



   
    
    <h4>Payment Id :      &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;   {statementId}    </h4>
         <h4>Reservation Id :   &nbsp;      &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  {reservationId}    </h4>
         <h4>Guest Id :       &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; {guestId}    </h4>
         <h4>Room No :        &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  {roomNo}    </h4>
         <h4>Date :      &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;      {date}    </h4>
         <h4>Grand Total :     &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  {total}    </h4>
         <h4>Paid :       &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; {total}    </h4>
         <h4>Balance :    &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; {0}    </h4>
         <h4>Transaction :        &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; {transaction}    </h4>
    

     

</div>

<button className="print-bill" onClick={handlePrint}>Print</button>
     

        </div>
    )
}