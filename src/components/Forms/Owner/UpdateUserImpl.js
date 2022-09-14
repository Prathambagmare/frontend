
import React from "react"
import { useState } from "react"
import './customTable.css'
import { UpdateUser } from "./UpdateUser"

export const UpdateUserImpl=(props)=>{
    const [show,setShow]=useState(false);
    function checkc(){
        let pop = document.getElementById("updateUser")
        setShow(!show)
        show?pop.style.display="block":pop.style.display="none";
      }
    return(
        <div id="updateUser" className="c-popup">
             <button className="closeButton" onClick={checkc}>Close</button>
              <UpdateUser username={props.username} ></UpdateUser>
             
        </div>
    )
}