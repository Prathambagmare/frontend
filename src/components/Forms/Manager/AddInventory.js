import '../forms.css';
import React from 'react';
import { InputField } from '../InputComponents/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';


export const AddInventory=()=>{

    let token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    function addItem(){

        const itemId = document.getElementById('itemId').value;
        const itemName = document.getElementById('itemName').value;
        const unitPrice = document.getElementById('unitPrice').value;
        const quantity = document.getElementById('quantity').value;
 

        if(itemId.length==0||itemName.length==0||unitPrice.length==0||quantity.length==0)
        {

            toast.error("Fields Cant be Empty");

        }else{

        // console.log(fullName,username,password,role,age,gender);
   
        try{
        axios.post("http://localhost:8180/inventory-api/manageInventory/addNewInventory",{itemId:itemId,itemName:itemName,unitPrice:unitPrice,quantity:quantity},config).then((response)=>{toast.success("Item Updated")}).catch((error)=>{toast.error("Not Added")});
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
                <h2>Add Item</h2>
            </div>
            <InputField label="Item ID" type="number" id="itemId"></InputField>
            <InputField label="Item Name" type="text" id="itemName"></InputField>
            <InputField label="Unit Price" type="number" id="unitPrice"></InputField>
            <InputField label="Quantity" type="number" id="quantity"></InputField>
            <button className="input-comp-cnt" onClick={addItem}>Add Item</button>
        </div>
    )
}