
import React, { useState,useEffect } from 'react';
import { InputField } from '../InputComponents/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';


export const UpdateUser=(props)=>{


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [products, setProducts] = useState("");
 

    async function getUserr(){

        await  axios.get("http://localhost:8180/auth-api/owner/getUser/"+props.username,config).then((response)=> {setProducts(response.data)});
        console.log(products)

        // document.getElementById('password').value = products.password;
       document.getElementById('fullName').value = products.fullName;
       document.getElementById('roles').value = products.roles;
       document.getElementById('age').value = products.age;
       document.getElementById('gender').value = products.gender;

    }


     useEffect(() => {
        // No infinite loop
     
        
        if(props!=null){
         getUserr()
         }
       
        // setState(count + 1);
      }, [props]);

   

    
    function updateUser(){

     
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
      
        axios.put("http://localhost:8180/auth-api/owner/updateUserDetails/"+props.username,{username:username,password:password,fullName:fullName,roles:roles,age:age,gender:gender},config).then((response)=>{toast.success("User Updated")}).catch((error)=>{toast.error("Not Added")});
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
                <h2>Update User</h2>
            </div>
            <InputField label="UserName" type="text" id="username" value={props.username}></InputField>
            <InputField label="Password" type="text" id="password"></InputField>
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
   
            <button className="input-comp-cnt" onClick={updateUser}>Update User</button>
        </div>
    )
}

