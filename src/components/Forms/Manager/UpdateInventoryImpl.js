import { AddRoom } from "./AddRoom"
import React from "react"
import { useState } from "react"
import './customTable.css'
import { UpdateRoom } from "./UpdateRoom"
import { UpdateInventory } from "./UpdateInventory"

export const UpdateInventoryImpl=(props)=>{
    const [show,setShow]=useState(false);
    function checkc(){
        let pop = document.getElementById("inventory")
        setShow(!show)
        show?pop.style.display="block":pop.style.display="none";
      }
    return(
        <div id="inventory" className="c-popup">
             <button className="closeButton" onClick={checkc}>Close</button>
              <UpdateInventory itemId={props.itemId} ></UpdateInventory>
             
        </div>
    )
}