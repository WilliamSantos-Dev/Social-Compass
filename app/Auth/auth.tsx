"use client"

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { APP_ROUTES } from "./app-routes";
import { useAuth } from "../Contexts/AuthContext";
type PrivateRoute ={
    children: ReactNode;
}
export const PrivateRoute = ({children}: PrivateRoute) =>{

  const auth = useAuth()
    const {push} = useRouter();
    const authorized = (auth.token)
    useEffect(()=>{
      if(!authorized){
        push(APP_ROUTES.public.login)
      }
    },[authorized, push]);
    return(
        <>
        {!authorized && null}
        {authorized && children}
        </>
    )

}


