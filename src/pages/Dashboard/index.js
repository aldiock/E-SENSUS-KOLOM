import React, { useContext, useEffect, useState } from "react";
import { NavBar, NavBarPelsus } from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";

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
      <div>{backEndData.getUserDetails().status}</div>
    </>
  );
};

export default Dashboard;
