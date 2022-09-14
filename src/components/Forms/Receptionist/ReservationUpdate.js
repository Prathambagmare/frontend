
import React from "react"
import { useState } from "react"
import './customTable.css'
import { ReservationAdd } from "./ReservationAdd"


export const ReservationUpdate=(props)=>{


    return(
        <div id="reservation">
             
              <ReservationAdd roomId={props.roomId} ></ReservationAdd>
             
        </div>
    )
}