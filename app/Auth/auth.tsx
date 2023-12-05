import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { APP_ROUTES } from "./app-routes";
import { authorize } from "./authorize";
import Load from "../components/Load/load";

type PrivateRoute ={
    children: ReactNode;
}

export const PrivateRoute = ({children}: PrivateRoute) =>{
    const {push} = useRouter();
    const authorized = authorize ();
    
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


