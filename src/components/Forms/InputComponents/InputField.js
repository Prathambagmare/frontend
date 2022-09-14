import './inputfield.css';
import React from 'react';

export const InputField=(prop)=>{
    return(
        <div className='input-comp-cnt'>
            <div className='inp-comp-label'>{prop.label}</div>
            <input id={prop.id} value={prop.value} type={prop.type} ></input>
          
        </div>
    )
}