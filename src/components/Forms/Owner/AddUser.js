import React from "react";
import '../forms.css'
import { InputField } from "../InputComponents/InputField";
import '../InputComponents/inputselector.css'
import axios from "axios";
import { toast } from "react-toastify";


export const AddUser=()=>{

    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    function addUser(){

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const fullName = document.getElementById('fullName').value;
        const rol = document.getElementById('roles');
        const role = rol.options[rol.selectedIndex].value;
        const roles = [role];
     
        const age = document.getElementById('age').value;
        const gen = document.getElementById('gender');
        const gender = gen.options[gen.selectedIndex].value;

     
      
        if(username.length==0||password.length==0||fullName.length==0||age.length==0)
        {

            toast.error("Fields Cant be Empty");

        }else{

        // console.log(fullName,username,password,role,age,gender);
   
        try{
        axios.post("http://localhost:8180/auth-api/owner/addUser",{username:username,password:password,fullName:fullName,roles:roles,age:age,gender:gender},config).then((response)=>{toast.success("User Updated")}).catch((error)=>{toast.error("Not Added")});
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
                <h2>Add User</h2>
            </div>
            <InputField label="Username" type="text" id="username"></InputField>
            <InputField label="Password" type="password" id="password"></InputField>
            <InputField label="Full Name" type="text" id="fullName"></InputField>
            <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Role</div>
            <select id="roles" className='inputo-selector'>
                <option selected="selected">MANAGER</option>
                <option>RECEPTIONIST</option>
                <option>OWNER</option>
            </select>
            </div>
            <InputField label="Age" type="number" id="age" ></InputField>
            <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Gender</div>
            <select id="gender" className='inputo-selector'>
                <option selected="selected">Male</option>
                <option>Female</option>
                <option>Transgender</option>
            </select>
            </div>
            <button className="input-comp-cnt" onClick={addUser}>Add User</button>
        </div>
    )
}