
import React, { useState,useEffect } from 'react';
import { InputField } from '../InputComponents/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';


export const UpdateGuest=(props)=>{


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [products, setProducts] = useState("");
 
    function updateGue()
    {
        toast.success("Guest Updated");
    }

    async function getGuest(){

        await  axios.get("http://localhost:8180/auth-api/receptionist/manageGuest/getGuest/"+props.guestId,config).then((response)=> {setProducts(response.data)});
        console.log(products)

        document.getElementById('fullName').value = products.fullName;
       document.getElementById('address').value = products.address;
       document.getElementById('city').value = products.city;
       document.getElementById('country').value = products.country;
       document.getElementById('gender').value = products.gender;
       document.getElementById('phoneNumber').value = products.phoneNumber;
       document.getElementById('gmail').value =products.gmail;
    }


     useEffect(() => {
        // No infinite loop
     
        
        if(props!=null){
         getGuest()
         }
       
        // setState(count + 1);
      }, [props]);

   

    
    function updateGuest(){

        const guestId = document.getElementById('guestId').value;
        const fullName = document.getElementById('fullName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const gen = document.getElementById('gender');
        const gender = gen.options[gen.selectedIndex].value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const gmail = document.getElementById('gmail').value;

     
      
        axios.put("http://localhost:8180/auth-api/receptionist/manageGuest/updateGuestDetails/"+props.guestId,{guestId:guestId,fullName:fullName,address:address,city:city,country:country,gender:gender,phoneNumber:phoneNumber,gmail:gmail},config).then((response)=>{updateGue();});
    
    }
    
    return(
        <div className='add-room-main'>
            <div className='add-room-header'>
                <h2>Update Guest</h2>
            </div>
            <InputField label="Guest Id" type="number" id="guestId" value={props.guestId}></InputField>
            <InputField label="Full Name" type="text" id="fullName" ></InputField>
            <InputField label="Address" type="text" id="address"></InputField>
            <InputField label="City" type="text" id="city" ></InputField>
            <InputField label="Country" type="text" id="country"></InputField>
            <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Gender</div>
            <select id="gender" className='inputo-selector'>
                <option selected="selected">Male</option>
                <option>Female</option>
                <option>Transgender</option>
            </select>
            </div>
            <InputField label="Phone Number" type="text" id="phoneNumber" ></InputField>
            <InputField label="Gmail" type="email" id="gmail"></InputField>
   
            <button className="input-comp-cnt" onClick={updateGuest}>Update Guest</button>
        </div>
    )
}

