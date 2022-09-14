import React, { useState } from 'react'
import './navexpandmenu.css'

export const NavExpMenu=()=>{
    const[isVisible,setVisible]=useState(false)
    function expand(item){
        const itemO = document.getElementById(item)
        itemO.style.height="fit-content";
        setVisible(!isVisible);
    }
    return(
        <div className='nav-exp-menu-cnt'>
            <div id='item1' className='nav-exp-outer'>Outer Name</div>
            <div id='nav-exp-inr-cnt'>
                <div className='nav-exp-iner-m'>inner item1</div>
                <div className='nav-exp-iner-m'>inner item2</div>
                <div className='nav-exp-iner-m'>inner item3</div>
            </div>
            
        </div>
    )
}