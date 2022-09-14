import { AddRoom } from "./AddRoom"
import React from "react"
import { useState } from "react"
import './customTable.css'
import { UpdateStaff } from "./UpdateStaff"

export const UpdateStaffImpl=(props)=>{
    const [show,setShow]=useState(false);
    function checkc(){
        let pop = document.getElementById("updateStaff")
        setShow(!show)
        show?pop.style.display="block":pop.style.display="none";
      }
    return(
        <div id="updateStaff" className="c-popup">
             <button className="closeButton" onClick={checkc}>Close</button>
              <UpdateStaff staffId={props.staffId} ></UpdateStaff>
             
        </div>
    )
}