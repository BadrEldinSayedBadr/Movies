import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";




export default function Layout({userData, setUserData}) {

  let navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('login');
  }

  return <>
  
  <Navbar logOut={logOut} userData={userData}/>
  <Outlet></Outlet>
  {/* <Footer/> */}
  
  </>
}
