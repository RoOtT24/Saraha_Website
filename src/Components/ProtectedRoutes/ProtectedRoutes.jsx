import React from 'react'
import cookie from "react-cookies";
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  
   if (!cookie.load("token"))
   return <Navigate to='/login'/>
   else
   return<Outlet/>
  
}
