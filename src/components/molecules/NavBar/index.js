import React from "react";
import { Navbar, Container } from "react-bootstrap";
import {
  Admin,
  Dashboard,
  DataJemaat,
  LogoGMIMHD,
  Logout,
} from "../../../assets";
import { Gap, Link } from "../../atoms";
import "./navbar.scss";

const NavBar = () => {
  return (
    <div className="navbar-wrap">
      <div className="title-wrap">
        <p className="text-login-header">E-SENSUS KOLOM 2</p>
        <p className="text-login-inner">GMIM "GENESARET" PATETEN</p>
      </div>
      <Gap width={80}/>
      <div className="dashboard">
        <img src={Dashboard} alt="dash" className="dash-logo" />
        <Link title="Dashboard" />
      </div>
      <div className="data-jemaat">
        <img src={DataJemaat} alt="data-jemaat" className="data-jemaat-logo" />
        <Link title="Data Jemaat" />
      </div>
      <div className="admin">
        <img src={Admin} alt="admin" className="admin-logo" />
        <Link title="Admin" />
      </div>
      <div className="data-kk">
        <img src={DataJemaat} alt="data-kk" className="dash-kk-logo" />
        <Link title="Data KK Jemaat" />
      </div>
      <div className="logout">
        <img src={Logout} alt="logout" className="logout-logo" />
        <Link title="Logout" />
      </div>
    </div>
  );
};

export default NavBar;
