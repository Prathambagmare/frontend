import React from "react";
import { InputField } from "../InputComponents/InputField";
import '../InputComponents/inputselector.css'
import axios from "axios";
import { toast } from "react-toastify";


export const GuestAdd=()=>{


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    function addGuest(){

        const guestId = document.getElementById('guestId').value;
        const fullName = document.getElementById('fullName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const gen = document.getElementById('gender');
        const gender = gen.options[gen.selectedIndex].value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const gmail = document.getElementById('gmail').value;

        if(guestId.length==0||fullName.length==0||address.length==0||city.length==0||country.length==0||phoneNumber.length==0||gmail.length==0)
        {

            toast.error("Fields Cant be Empty");

        }else{

        

     
      try{
        axios.post("http://localhost:8180/auth-api/receptionist/manageGuest/addNewGuest",{guestId:guestId,fullName:fullName,address:address,city:city,country:country,gender:gender,phoneNumber:phoneNumber,gmail:gmail},config).then((response)=>{toast.success("Guest Added")}).catch((error)=>{toast.error("Not Added")});
      }
      catch(error)
      {
        toast.error("Not Added")

      }
    }
    }



    return(
        <div className='add-room-main'>
      
             <div className='add-room-header'>
                <h2>Add Guest</h2>
            </div>
            <InputField label="Guest Id" type="number" id="guestId"></InputField>
            <InputField label="Full Name" type="text" id="fullName"></InputField>
            <InputField label="Address" type="text" id="address"></InputField>
            <InputField label="City" type="text" id="city"></InputField>
            <InputField label="Country" type="text" id="country"></InputField>
            <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Gender</div>
            <select id="gender" className='inputo-selector'>
                <option selected="selected">Male</option>
                <option>Female</option>
                <option>Transgender</option>
            </select>
            </div>
            <InputField label="Phone Number" type="text" id="phoneNumber"></InputField>
            <InputField label="Gmail" type="text" id="gmail"></InputField>

            
            
            <button className="input-comp-cnt" onClick={addGuest}>Add Guest</button>
        </div>
    )
}