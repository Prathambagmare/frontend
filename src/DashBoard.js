import { SideBarBlue } from './components/DashBoard/SideBarBlue';
import React from 'react';
import './dashboard.css'
import { AddStaff } from './components/Forms/Manager/AddStaff';
import { AddInventory } from './components/Forms/Manager/AddInventory';
import { Manager } from './components/DashBoard/ExpandingMenu/Manager';
import { Navigate, Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RoomRates } from './components/Forms/Owner/RoomRates';
import { Report } from './components/Forms/Owner/Report';
import { StaffDel } from './components/Forms/Owner/StaffDel';
import { Backup } from './components/Forms/Owner/BackUp';
import { AddUser } from './components/Forms/Owner/AddUser';
import { UpdateUser } from './components/Forms/Owner/UpdateUser';
import { AddRoom } from './components/Forms/Manager/AddRoom';
import { SearchRoom } from './components/Forms/Receptionist/SearchRoom';
import { IssueBill } from './components/Forms/Receptionist/IssueBill';
import { Payment } from './components/Forms/Receptionist/Payment';
import { ReservationAdd } from './components/Forms/Receptionist/ReservationAdd';
import { ReservationEdit } from './components/Forms/Receptionist/ReservationEdit';
import { GuestAdd } from './components/Forms/Receptionist/GuestAdd';
import { GuestEdit } from './components/Forms/Receptionist/GuestEdit';
import { PrivateRouterOwner, PrivateRouterManager, PrivateRouterReceptionist } from './components/PrivateRouterRole';
import { ViewRoom } from './components/Forms/Manager/ViewRoom';
import { ViewStaff } from './components/Forms/Manager/ViewStaff';
import { ViewInventory } from './components/Forms/Manager/ViewInventory';
import { ViewUsers } from './components/Forms/Owner/ViewUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SuccessPayment } from './components/Payment/SuccessPayment';

function DashBoard(){

    let nav = useNavigate();

    function logout(){
        window.localStorage.clear()
        window.sessionStorage.clear()
        nav("/")
    }
    return(
        <div className='new-dash-main-cont'>
            <div className="new-dash-col1">
                <SideBarBlue></SideBarBlue>
            </div>
            <div className="new-dash-col2">
              
                <button className='logout-btn' onClick={logout}>Logout</button>
                <ToastContainer />
                <Routes>
                <Route path='manage/addroom' element={<PrivateRouterManager><AddRoom/></PrivateRouterManager>}></Route>
    
                    <Route path="manage/addstaff" element={<PrivateRouterManager><AddStaff/></PrivateRouterManager>}></Route>
                    <Route path="manage/addinvent" element={<PrivateRouterManager><AddInventory/></PrivateRouterManager>}></Route>
                    <Route path="manage/uroom" element={<PrivateRouterManager><ViewRoom/></PrivateRouterManager>}></Route>
                    <Route path="manage/ustaff" element={<PrivateRouterManager><ViewStaff/></PrivateRouterManager>}></Route>
                    <Route path="manage/uitem" element={<PrivateRouterManager><ViewInventory/></PrivateRouterManager>}></Route>

                    <Route path="owner/setrates" element={<PrivateRouterOwner><ViewRoom/></PrivateRouterOwner>}></Route>
                    <Route path="owner/viewreport" element={<PrivateRouterOwner><Report/></PrivateRouterOwner>}></Route>
                    <Route path="owner/delstaff" element={<PrivateRouterOwner><StaffDel/></PrivateRouterOwner>}></Route>
                    <Route path="owner/backup" element={<PrivateRouterOwner><Backup/></PrivateRouterOwner>}></Route>
                    <Route path="owner/adduser" element={<PrivateRouterOwner><AddUser/></PrivateRouterOwner>}></Route>
                    <Route path="owner/upuser" element={<PrivateRouterOwner><ViewUsers/></PrivateRouterOwner>}></Route>

                    <Route path="reception/searchroom" element={<PrivateRouterReceptionist><SearchRoom/></PrivateRouterReceptionist>}></Route>
                    <Route path="reception/issuebill" element={<PrivateRouterReceptionist><IssueBill/></PrivateRouterReceptionist>}></Route>
                    <Route path="reception/payment" element={<PrivateRouterReceptionist><Payment/></PrivateRouterReceptionist>}></Route>
                    <Route path="reception/newreservation" element={<PrivateRouterReceptionist><ReservationAdd/></PrivateRouterReceptionist>}></Route>
                    <Route path="reception/editreservation" element={<PrivateRouterReceptionist><ReservationEdit/></PrivateRouterReceptionist>}></Route>
                    <Route path="reception/addguest" element={<PrivateRouterReceptionist><GuestAdd/></PrivateRouterReceptionist>}></Route>
                    <Route path="reception/editguest" element={<PrivateRouterReceptionist><GuestEdit/></PrivateRouterReceptionist>}></Route>
                    <Route path="reception/successpayment" element={<PrivateRouterReceptionist><SuccessPayment/></PrivateRouterReceptionist>}></Route>
           

                </Routes>
            </div>
        </div>
    )
}

export default DashBoard;