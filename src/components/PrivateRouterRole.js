import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRouterManager({children}){

  

    return(
        (localStorage.getItem("role")=="MANAGER")?children:<Navigate to='/home'></Navigate>
    )
}

export function PrivateRouterOwner({children}){

  

    return(
        (localStorage.getItem("role")=="OWNER")?children:<Navigate to='/home'></Navigate>
    )
}
export function PrivateRouterReceptionist({children}){

  

    return(
        (localStorage.getItem("role")=="RECEPTIONIST")?children:<Navigate to='/home'></Navigate>
    )
}