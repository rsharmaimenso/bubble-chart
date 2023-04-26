import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {


    return(
        <>
            <div></div>
            <Outlet />
        </>
    );
};

export default Layout;