"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";

const Authprovider = ({ children }) => {
    return(
        <SessionProvider>{children}</SessionProvider>
    ) 
}

export default Authprovider;
