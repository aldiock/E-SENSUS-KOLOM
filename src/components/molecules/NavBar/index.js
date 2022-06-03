import React from "react";
import { useHistory } from "react-router-dom";
import { Admin, Dashboard, DataJemaat, Logout } from "../../../assets";
import { Gap, Link } from "../../atoms";
import "./navbar.scss";

const NavBar = () => {
  const history = useHistory();

  return (
    <div className="navbar-wrap">
      <div className="title-wrap">
        <p className="text-login-header">E-SENSUS KOLOM 2</p>
        <p className="text-login-inner">GMIM "GENESARET" PATETEN</p>
      </div>
      <Gap width={80} />
      <div className="dashboard">
        <img src={Dashboard} alt="dash" className="dash-logo" />
        <Link title="Dashboard" onClick={() => history.push("/")} />
      </div>
      <div className="data-jemaat">
        <img src={DataJemaat} alt="data-jemaat" className="data-jemaat-logo" />
        <Link
          title="Data Jemaat"
          onClick={() => history.push("/data-jemaat")}
        />
      </div>
      <div className="admin">
        <img src={Admin} alt="admin" className="admin-logo" />
        <Link title="Admin" onClick={() => history.push("/admin")} />
      </div>
      <div className="data-kk">
        <img src={DataJemaat} alt="data-kk" className="dash-kk-logo" />
        <Link
          title="Data KK Jemaat"
          onClick={() => history.push("/data-kk-jemaat")}
        />
      </div>
      <div className="logout">
        <img src={Logout} alt="logout" className="logout-logo" />
        <Link title="Logout" onClick={() => history.push("/login")} />
      </div>
    </div>
  );
};

export default NavBar;
