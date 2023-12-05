"use client"
import { ReactNode } from "react"
import { UserProvider } from "../Contexts/AuthContext"

export const Providers = ({children}: {children: ReactNode}) =>{
    return <UserProvider>{children}</UserProvider>
}