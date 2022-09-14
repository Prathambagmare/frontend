import { AddRoom } from "./AddRoom"
import React from "react"
import { useState } from "react"
import './customTable.css'
import { UpdateRoom } from "./UpdateRoom"

export const UpdateRoomImpl=(props)=>{
    const [show,setShow]=useState(false);
    function checkc(){
        let pop = document.getElementById("awe")
        setShow(!show)
        show?pop.style.display="block":pop.style.display="none";
      }
    return(
        <div id="awe" className="c-popup">
             <button className="closeButton" onClick={checkc}>Close</button>
              <UpdateRoom roomNo={props.roomNo} ></UpdateRoom>
             
        </div>
    )
}