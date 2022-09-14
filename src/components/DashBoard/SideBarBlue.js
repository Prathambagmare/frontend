import React from 'react'
import './sidebarblue.css'
import logo from '../../assets/Grand_Sita.png';
import prof from '../../assets/man.png'
import { Manager } from './ExpandingMenu/Manager';
import { Owner } from './ExpandingMenu/Owner';
import { Receptionist } from './ExpandingMenu/Receptionist';

export const SideBarBlue=(prop)=>{

    return(
        <div className='nb-blue-main-cnt'>
            <div className='nb-blue-menu-top-row'>
                <img className='main-icon-gs' src={logo} width="45px" height="auto"/>The Grand Shine
            </div>
            <Snapshot des={localStorage.getItem("role")} name={localStorage.getItem("name")} age={localStorage.getItem("age")} gen={localStorage.getItem("gender")} 
            ulink={prof}></Snapshot>
            <ExpMen role={localStorage.getItem("role")}></ExpMen>
        </div>
    )
}

function ExpMen(prop){
    if(prop.role=="MANAGER"){
        return <div><Manager></Manager></div>
    }else if(prop.role=="OWNER"){
        return <div><Owner></Owner></div>
    }else if(prop.role=="RECEPTIONIST"){
        return <div><Receptionist></Receptionist></div>
    }
}

function Snapshot(props){
    return(
        <div className='profile-snap-block'>
            <div className='profile-snap-block-cnt'>
                <img className='profile-snap-pic' src={props.ulink} width='120px' height='120px'/>
                <div className='profile-snap-block-desn'>{props.des}</div>
                <div className='profile-snap-block-details'>
                    <div className='profile-snap-field'>Name :&nbsp;{props.name}</div>
                    <div className='profile-snap-field'>Age :&nbsp;{props.age}</div>
                    <div className='profile-snap-field'>Gender :&nbsp;{props.gen}</div>
                </div>
            </div>
        </div>
    )
}