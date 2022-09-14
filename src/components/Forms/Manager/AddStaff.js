import '../forms.css'
import React from 'react'
import { InputField } from '../InputComponents/InputField'
import { Gender, InputSelector } from '../InputComponents/InputSelector'
import axios from 'axios'
import '../InputComponents/inputselector.css'
import { toast } from 'react-toastify';

export const AddStaff=()=>{


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    function addStaff(){

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

        if(staffId.length==0||fullName.length==0||address.length==0||city.length==0||country.length==0||age.length==0||phoneNumber.length==0||gmail.length==0)
        {

            toast.error("Fields Cant be Empty");

        }else{

        // console.log(fullName,username,password,role,age,gender);
   
        try{
      
        axios.post("http://localhost:8180/auth-api/manager/manageStaff/addNewStaff",{staffId:staffId,fullName:fullName,address:address,city:city,country:country,gender:gender,age:age,phoneNumber:phoneNumber,gmail:gmail},config).then((response)=>{toast.success("Staff Added")}).catch((error)=>{toast.error("Not Added")});
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
                <h2>Add Staff</h2>
            </div>
            <InputField label="Staff Id" type="number" id="staffId" ></InputField>
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
           
            <button className="input-comp-cnt" onClick={addStaff}>Add Staff</button>
        </div>
    )
}

