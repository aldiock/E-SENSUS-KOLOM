import React, { useContext, useEffect, useState } from "react";
import { LogoGMIMHD } from "../../assets";
import {
  CardInfoJemaat,
  CardInfoKKJemaat,
  Gap,
  NavBar,
  NavBarPelsus,
} from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";
import "./dashboard.scss";

const Dashboard = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavbarValid] = useState(true);

  useEffect(() => {
    if (backEndData.getUserDetails().status === "Admin") {
      setNavbarValid(false);
    } else {
      setNavbarValid(true);
    }
  }, []);

  return (
    <>
      {navbarValid === false ? (
        <div>
          <NavBar />
        </div>
      ) : (
        <div>
          <NavBarPelsus />
        </div>
      )}
      <div className="dashboard-section">
        <p className="title-dash">Dashboard</p>
        <hr/>
      </div>
      <div className="wrapper-dashboard">
        <CardInfoJemaat />
        <Gap width={45} />
        <CardInfoKKJemaat />
      </div>
    </>
  );
};

export default Dashboard;
