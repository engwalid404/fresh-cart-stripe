import React from "react";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import Nav from "../Navbar/Nav";

const Layout = () => {
  return (
    
    <div className="">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
