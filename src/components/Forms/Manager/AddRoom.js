import './addroom.css';
import React from 'react';
import { InputField } from '../InputComponents/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AddRoom=()=>{

    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    function addRoom(){

        const roomNo = document.getElementById('roomNo').value;
        const roomType = document.getElementById('roomType').value;
        const status = false;
        const maxAllow = document.getElementById('maxAllow').value;
        const adultPrice = document.getElementById('adultPrice').value;
        const childPrice = document.getElementById('childPrice').value;



        if(roomNo.length==0||roomType.length==0||maxAllow.length==0||adultPrice.length==0||childPrice.length==0)
        {

            toast.error("Fields Cant be Empty");

        }else{

        // console.log(fullName,username,password,role,age,gender);
   
        try{
        axios.post("http://localhost:8180/room-api/manageRooms/addNewRoom",{roomNo:roomNo,roomType:roomType,status:status,adultPrice:adultPrice,childPrice:childPrice,maxAllow:maxAllow},config).then((response)=>{toast.success("Room Added")}).catch((error)=>{toast.error("Not Added")});
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
                <h2>Add Room</h2>
            </div>
            <InputField label="Room No" type="number" id="roomNo" ></InputField>
            <InputField label="Room Type" type="text" id="roomType" ></InputField>
            <InputField label="Adult Price" type="number" id="adultPrice" ></InputField>
            <InputField label="Child Price" type="number" id="childPrice" ></InputField>
            <InputField label="Max Allowed" type="number" id="maxAllow" ></InputField>
            {/* <InputO></InputO> */}
            <button className="input-comp-cnt" onClick={addRoom}>Add Room</button>
        </div>
    )
}

// function InputO(prop){
//     return(
//         <div className='input-comp-cnt'>
//             <div>Status</div>
//             <select id={prop.id} className="inputo-selector">
//                 <option>Booked</option>
//                 <option>Available</option>
//             </select>
//         </div>
//     )
// }