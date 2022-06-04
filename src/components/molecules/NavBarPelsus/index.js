import React,{useContext} from "react";
import { useHistory } from "react-router-dom";
import { Admin, Dashboard, DataJemaat, Logout } from "../../../assets";
import { Gap, Link } from "../../atoms";
import "./navbarpelsus.scss";
import backEndDataContext from "../../../contexts/backEndDataContext";

const NavBarPelsus = () => {
  const backEndData = useContext(backEndDataContext)
  const history = useHistory();

  return (
    <div className="navbar-wrap">
      <div className="title-wrap">
        <p className="text-login-header">E-SENSUS KOLOM 2</p>
        <p className="text-login-inner">GMIM "GENESARET" PATETEN</p>
      </div>
      <Gap width={280} />
      <div className="dashboard">
        <p className="text-login-as">Hai, {backEndData.getUserDetails().namaLengkap}</p>
        <Gap width={10}/>
        <img src={Dashboard} alt="dash" className="dash-logo" />
        <Link title="Dashboard" onClick={() => history.push("/dashboard")} />
      </div>
      <div className="data-jemaat">
        <img src={DataJemaat} alt="data-jemaat" className="data-jemaat-logo" />
        <Link
          title="Data Jemaat"
          onClick={() => history.push("/data-jemaat")}
        />
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

export default NavBarPelsus;
