import '../sidebarblue.css'
import fileA from '../../../assets/add-file.png';
import fileU from '../../../assets/file-up.png';
import manager from '../../../assets/living-room.png';
import managestafflg from '../../../assets/service.png'
import invent from '../../../assets/inventory.png'
import React from 'react';
import { useState } from 'react';
import './expandingmenu.css'
import { useNavigate } from 'react-router-dom';


export const Manager=()=>{

    const[show,setShow]=useState(true);
    const[show2,setShow2]=useState(true);
    const[show3,setShow3]=useState(true);

    let navi = useNavigate();
    const addR =()=>{
        navi("manage/addroom");
    }
    const addS =()=>{
        navi("manage/addstaff");
    }
    const addI =()=>{
        navi("manage/addinvent");
    }
    const UpR =()=>{
        navi("manage/uroom");
    }
    const UpS =()=>{
        navi("manage/ustaff");
    }
    const UpI =()=>{
        navi("manage/uitem");
    }
    

    const toggle =()=>{
        
        const item = document.getElementById("nv-inr-cnt");
        const arrow = document.getElementById('down-arrow1');
        if(show){
            item.style.height="fit-content";
            arrow.style.transform="rotate(180deg)";
            addR();
        }else{
            item.style.height="0";
            arrow.style.transform="rotate(360deg)";
        }
        setShow(!show);
    }

    const toggle2 =()=>{
        
        const item = document.getElementById("nv-inr-cnt2");
        const arrow = document.getElementById('down-arrow2');
        if(show2){
            item.style.height="fit-content";
            arrow.style.transform="rotate(180deg)";
            addS();
        }else{
            item.style.height="0";
            arrow.style.transform="rotate(360deg)";
        }
        setShow2(!show2);
    }

    const toggle3 =()=>{
        
        const item = document.getElementById("nv-inr-cnt3");
        const arrow = document.getElementById('down-arrow3');
        if(show3){
            item.style.height="fit-content";
            arrow.style.transform="rotate(180deg)";
            addI();
        }else{
            item.style.height="0";
            arrow.style.transform="rotate(360deg)";
        }
        setShow3(!show3);
    }

    return(
    <div className='nb-blue-menu-bt-row'>
        <div className='nv-expanding-menu-main-cnt'>
            <div onClick={toggle} className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={manager} width="25px" height="auto"></img>
                <div className='manage-rooms'>Manage Rooms</div>
                <img id="down-arrow1" className='down-ar' src="https://img.icons8.com/external-those-icons-fill-those-icons/12/f5f5f5/external-down-arrows-those-icons-fill-those-icons-7.png"></img>
            </div>
            <div id="nv-inr-cnt" className='nv-expanding-menu-inr-cnt'>
                <div className='nv-expanding-menu-inr-itm' onClick={addR}><img id="fileAdd" src={fileA} width="15px" height="auto"/>Add Room</div>
                <div className='nv-expanding-menu-inr-itm' onClick={UpR}><img id="fileAdd" src={fileU} width="15px" height="auto"/>Update Room</div>
            </div>
        </div>
        <div className='nv-expanding-menu-main-cnt'>
            <div onClick={toggle2} className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={managestafflg} width="25px" height="auto"></img>
                <div className='manage-rooms'>Manage Staff</div>
                <img id="down-arrow2" className='down-ar' src="https://img.icons8.com/external-those-icons-fill-those-icons/12/f5f5f5/external-down-arrows-those-icons-fill-those-icons-7.png"></img>
            </div>
            <div id="nv-inr-cnt2" className='nv-expanding-menu-inr-cnt'>
                <div className='nv-expanding-menu-inr-itm' onClick={addS}><img id="fileAdd" src={fileA} width="15px" height="auto"/>Add Staff</div>
                <div className='nv-expanding-menu-inr-itm' onClick={UpS}><img id="fileAdd" src={fileU} width="15px" height="auto"/>Update Staff</div>
            </div>
        </div>
        <div className='nv-expanding-menu-main-cnt'>
            <div onClick={toggle3} className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={invent} width="25px" height="auto"></img>
                <div className='manage-rooms'>Manage Inventory</div>
                <img id="down-arrow3" className='down-ar' src="https://img.icons8.com/external-those-icons-fill-those-icons/12/f5f5f5/external-down-arrows-those-icons-fill-those-icons-7.png"></img>
            </div>
            <div id="nv-inr-cnt3" className='nv-expanding-menu-inr-cnt'>
                <div className='nv-expanding-menu-inr-itm' onClick={addI}><img id="fileAdd" src={fileA} width="15px" height="auto"/>Add Inventory</div>
                <div className='nv-expanding-menu-inr-itm' onClick={UpI}><img id="fileAdd" src={fileU} width="15px" height="auto"/>Update Inventory</div>
            </div>
        </div>
    </div>
    )
}