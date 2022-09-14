import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({children}){
    return(
        localStorage.getItem("isAuth")?children:<Navigate to='/'></Navigate>
    )
}