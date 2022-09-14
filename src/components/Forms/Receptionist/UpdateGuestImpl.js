
import React from "react"
import { useState } from "react"

import { UpdateGuest } from "./UpdateGuest"

export const UpdateGuestImpl=(props)=>{
    const [show,setShow]=useState(false);
    function checkc(){
        let pop = document.getElementById("updateGuest")
        setShow(!show)
        show?pop.style.display="block":pop.style.display="none";
      }
    return(
        <div id="updateGuest" className="c-popup">
             <button className="closeButton" onClick={checkc}>Close</button>
              <UpdateGuest guestId={props.guestId} ></UpdateGuest>
             
        </div>
    )
}