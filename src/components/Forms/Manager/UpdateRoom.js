import './addroom.css';
import React, { useState,useEffect } from 'react';
import { InputField } from '../InputComponents/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UpdateRoom=(props)=>{


    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [rooms, setRooms] = useState("");
 

    async function getRoom(){

        await  axios.get("http://localhost:8180/room-api/manageRooms/getRoom/"+props.roomNo,config).then((response)=> {setRooms(response.data)});
        console.log(rooms)

       document.getElementById('roomType').value = rooms.roomType;
       document.getElementById('maxAllow').value = rooms.maxAllow;
       document.getElementById('adultPrice').value = rooms.adultPrice;
       document.getElementById('childPrice').value = rooms.childPrice;
       let stat = rooms.status;
       if(stat)
       {
        document.getElementById('status').value = "Unavailable"
       }
       else{
        document.getElementById('status').value = "Available"
       }
       
    }


     useEffect(() => {
        // No infinite loop
     
        
        if(props!=null){
         getRoom()
         }
       
        // setState(count + 1);
      }, [props]);

   

    
    function addRoom(){

        const roomNo = document.getElementById('roomNo').value;
        const roomType = document.getElementById('roomType').value;
        const sta = document.getElementById('status');
        const stat = sta.options[sta.selectedIndex].value;
        let status = true;
        if(stat == "Available"){
            status = false;
        }
        else{
            status = true;
        }
     
        const maxAllow = document.getElementById('maxAllow').value;
        const adultPrice = document.getElementById('adultPrice').value;
        const childPrice = document.getElementById('childPrice').value;



        if(roomNo.length==0||roomType.length==0||maxAllow.length==0||adultPrice.length==0||childPrice.length==0)
        {

            toast.error("Fields Cant be Empty");

        }else{

        // console.log(fullName,username,password,role,age,gender);
   
        try{
        axios.put("http://localhost:8180/room-api/manageRooms/updateRoomDetails/"+props.roomNo,{roomNo:roomNo,roomType:roomType,status:status,adultPrice:adultPrice,childPrice:childPrice,maxAllow:maxAllow},config).then((response)=>{toast.success("Room Updated")}).catch((error)=>{toast.error("Not Added")});
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
                <h2>Update Room</h2>
            </div>
            <InputField label="Room No" type="number" id="roomNo" value={props.roomNo}></InputField>
            <InputField label="Room Type" type="text" id="roomType" ></InputField>
            <InputField label="Adult Price" type="number" id="adultPrice"></InputField>
            <InputField label="Child Price" type="number" id="childPrice"></InputField>
            <InputField label="Max Allowed" type="number" id="maxAllow"></InputField>
            <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Status</div>
            <select id="status" className='inputo-selector'>
                <option selected="selected">Unavailable</option>
                <option>Available</option>
            </select>
            </div>
   
            <button className="input-comp-cnt" onClick={addRoom}>Update Room</button>
        </div>
    )
}

