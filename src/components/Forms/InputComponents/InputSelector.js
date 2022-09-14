import './inputselector.css'
import React from 'react'

export const InputSelector=(prop)=>{
    return(
        <div className='input-comp-cnt'>
            <select id={prop.id} className="inputo-selector">
                <option>Booked</option>
                <option>Available</option>
            </select>
        </div>
    )
}

export const Gender=()=>{
    return(
        <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Gender</div>
            <select className='inputo-selector'>
                <option selected="selected">Male</option>
                <option>Female</option>
                <option>Transgender</option>
            </select>
        </div>
    )
}

export const Country=()=>{
    return(
        <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Country</div>
            <select className='inputo-selector'>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
            </select>
        </div>
    )
}

export const Role=()=>{
    return(
        <div className='input-comp-cnt'>
            <div className='inp-comp-label'>Gender</div>
            <select className='inputo-selector'>
                <option>Manager</option>
                <option>Owner</option>
                <option>Receptionist</option>
            </select>
        </div>
    )
}