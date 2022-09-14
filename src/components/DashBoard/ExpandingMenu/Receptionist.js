import '../sidebarblue.css'
import fileA from '../../../assets/add-file.png';
import fileU from '../../../assets/file-up.png';
import fileD from '../../../assets/file-del.png';
import manager from '../../../assets/living-room.png';
import managestafflg from '../../../assets/service.png'
import invent from '../../../assets/inventory.png'
import React from 'react';
import { useState } from 'react';
import './expandingmenu.css'
import { useNavigate } from 'react-router-dom';


export const Receptionist=()=>{

    const[show3,setShow3]=useState(true);
    const[show,setShow]=useState(true);

    let navi = useNavigate();

    const ser =()=>{
        navi("reception/searchroom");
    }
    const bill =()=>{
        navi("reception/issuebill");
    }

    const nRes =()=>{
        navi("reception/newreservation");
    }
    const eRes =()=>{
        navi("reception/editreservation");
    }
    const aGs =()=>{
        navi("reception/addguest");
    }
    const eGs =()=>{
        navi("reception/editguest");
    }

    const toggle3 =()=>{
        
        const item = document.getElementById("nv-inr-cnt3");
        const arrow = document.getElementById('down-arrow3');
        if(show3){
            item.style.height="fit-content";
            arrow.style.transform="rotate(180deg)";
            nRes();
        }else{
            item.style.height="0";
            arrow.style.transform="rotate(360deg)";
        }
        setShow3(!show3);
    }

    const toggle =()=>{
        
        const item = document.getElementById("nv-inr-cnt");
        const arrow = document.getElementById('down-arrow');
        if(show){
            item.style.height="fit-content";
            arrow.style.transform="rotate(180deg)";
            aGs();
        }else{
            item.style.height="0";
            arrow.style.transform="rotate(360deg)";
        }
        setShow(!show);
    }

    return(
    <div className='nb-blue-menu-bt-row'>
        <div className='nv-expanding-menu-main-cnt'>
            <div className='nv-expanding-menu-outer-item' onClick={ser}>
                <img id='manager-icon' src={manager} width="25px" height="auto"></img>
                <div className='manage-rooms'>Search Rooms</div>
            </div>
        </div>
        <div className='nv-expanding-menu-main-cnt' onClick={bill}>
            <div className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={managestafflg} width="25px" height="auto"></img>
                <div className='manage-rooms'>issue bills</div>
            </div>
        </div>
      

        <div className='nv-expanding-menu-main-cnt'>
            <div onClick={toggle3} className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={invent} width="25px" height="auto"></img>
                <div className='manage-rooms'>Manage Reservation</div>
                <img id="down-arrow3" className='down-ar' src="https://img.icons8.com/external-those-icons-fill-those-icons/12/f5f5f5/external-down-arrows-those-icons-fill-those-icons-7.png"></img>
            </div>
            <div id="nv-inr-cnt3" className='nv-expanding-menu-inr-cnt'>
                <div className='nv-expanding-menu-inr-itm' onClick={nRes}><img id="fileAdd" src={fileA} width="15px" height="auto"/>New Reservation</div>
                <div className='nv-expanding-menu-inr-itm' onClick={eRes}><img id="fileAdd" src={fileU} width="15px" height="auto"/>Edit Reservation</div>
            </div>
        </div>
        <div className='nv-expanding-menu-main-cnt'>
            <div onClick={toggle} className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={invent} width="25px" height="auto"></img>
                <div className='manage-rooms'>Manage Guest</div>
                <img id="down-arrow" className='down-ar' src="https://img.icons8.com/external-those-icons-fill-those-icons/12/f5f5f5/external-down-arrows-those-icons-fill-those-icons-7.png"></img>
            </div>
            <div id="nv-inr-cnt" className='nv-expanding-menu-inr-cnt'>
                <div className='nv-expanding-menu-inr-itm' onClick={aGs}><img id="fileAdd" src={fileA} width="15px" height="auto"/>Add Guest Details</div>
                <div className='nv-expanding-menu-inr-itm' onClick={eGs}><img id="fileAdd" src={fileU} width="15px" height="auto"/>Edit Guest Details</div>
            </div>
        </div>
    </div>
    )
}