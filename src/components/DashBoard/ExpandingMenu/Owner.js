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


export const Owner=()=>{

    const[show3,setShow3]=useState(true);

    let navi = useNavigate();
    const setRates =()=>{
        navi("owner/setRates");
    }
    const viewR =()=>{
        navi("owner/viewreport");
    }
    const DelS =()=>{
        navi("owner/delstaff");
    }
    const Bac =()=>{
        navi("owner/backup");
    }
    const AddU =()=>{
        navi("owner/adduser");
    }
    const UpU =()=>{
        navi("owner/upuser");
    }

    const toggle3 =()=>{
        
        const item = document.getElementById("nv-inr-cnt3");
        const arrow = document.getElementById('down-arrow3');
        if(show3){
            item.style.height="fit-content";
            arrow.style.transform="rotate(180deg)";
            AddU();
        }else{
            item.style.height="0";
            arrow.style.transform="rotate(360deg)";
        }
        setShow3(!show3);
    }

    return(
    <div className='nb-blue-menu-bt-row'>
        <div className='nv-expanding-menu-main-cnt'>
            <div className='nv-expanding-menu-outer-item' onClick={setRates}>
                <img id='manager-icon' src={manager} width="25px" height="auto"></img>
                <div className='manage-rooms'>Set Room Rates</div>
            </div>
        </div>
        <div className='nv-expanding-menu-main-cnt' onClick={viewR}>
            <div className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={managestafflg} width="25px" height="auto"></img>
                <div className='manage-rooms'>View Report</div>
            </div>
        </div>
        <div className='nv-expanding-menu-main-cnt' onClick={DelS}>
            <div className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={invent} width="25px" height="auto"></img>
                <div className='manage-rooms'>Delete Staff Member</div>
            </div>
        </div>
        <div className='nv-expanding-menu-main-cnt' onClick={Bac}>
            <div className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={manager} width="25px" height="auto"></img>
                <div className='manage-rooms'>Take Backup</div>
            </div>
        </div>

        <div className='nv-expanding-menu-main-cnt'>
            <div onClick={toggle3} className='nv-expanding-menu-outer-item'>
                <img id='manager-icon' src={invent} width="25px" height="auto"></img>
                <div className='manage-rooms'>Manage Users</div>
                <img id="down-arrow3" className='down-ar' src="https://img.icons8.com/external-those-icons-fill-those-icons/12/f5f5f5/external-down-arrows-those-icons-fill-those-icons-7.png"></img>
            </div>
            <div id="nv-inr-cnt3" className='nv-expanding-menu-inr-cnt'>
                <div className='nv-expanding-menu-inr-itm' onClick={AddU}><img id="fileAdd" src={fileA} width="15px" height="auto"/>Add User Details</div>
                <div className='nv-expanding-menu-inr-itm' onClick={UpU}><img id="fileAdd" src={fileU} width="15px" height="auto"/>Update User Details</div>
            </div>
        </div>
    </div>
    )
}