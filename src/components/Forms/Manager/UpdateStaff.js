import './addroom.css';
import React, { useState,useEffect } from 'react';
import { InputField } from '../InputComponents/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UpdateStaff=(props)=>{


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [products, setProducts] = useState("");
 

    async function getStaff(){

        await  axios.get("http://localhost:8180/auth-api/manager/manageStaff/getStaff/"+props.staffId,config).then((response)=> {setProducts(response.data)});
        console.log(products)

        document.getElementById('fullName').value = products.fullName;
       document.getElementById('address').value = products.address;
       document.getElementById('city').value = products.city;
       document.getElementById('country').value = products.country;
       document.getElementById('gender').value = products.gender;
       document.getElementById('age').value = products.age;
       document.getElementById('phoneNumber').value = products.phoneNumber;
       document.getElementById('gmail').value =products.gmail;
    }


     useEffect(() => {
        // No infinite loop
     
        
        if(props!=null){
         getStaff()
         }
       
        // setState(count + 1);
      }, [props]);

   

    
    function updateStaff(){

        const staffId = document.getElementById('staffId').value;
        const fullName = document.getElementById('fullName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const gen = document.getElementById('gender');
        const gender = gen.options[gen.selectedIndex].value;
     
        const age = document.getElementById('age').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const gmail = document.getElementById('gmail').value;





        // console.log(fullName,username,password,role,age,gender);
   
        if(staffId.length==0||fullName.length==0||address.length==0||city.length==0||country.length==0||age.length==0||phoneNumber.length==0||gmail.length==0)
        {

            toast.error("Fields Cant be Empty");

        }else{

        // console.log(fullName,username,password,role,age,gender);
   
        try{
      
        axios.put("http://localhost:8180/auth-api/manager/manageStaff/updateStaffDetails/"+props.staffId,{staffId:staffId,fullName:fullName,address:address,city:city,country:country,gender:gender,age:age,phoneNumber:phoneNumber,gmail:gmail},config).then((response)=>{toast.success("Staff Updated")}).catch((error)=>{toast.error("Not Added")});
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
                <h2>Update Staff</h2>
            </div>
            <InputField label="Staff Id" type="number" id="staffId" value={props.staffId}></InputField>
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
            <InputField label="Age" type="number" id="age"></InputField>
            <InputField label="Phone Number" type="text" id="phoneNumber" ></InputField>
            <InputField label="Gmail" type="email" id="gmail"></InputField>
   
            <button className="input-comp-cnt" onClick={updateStaff}>Update Staff</button>
        </div>
    )
}

