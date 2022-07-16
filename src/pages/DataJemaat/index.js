import React, { useContext, useEffect, useState } from "react";
import {
  NavBar,
  NavBarPelsus,
  CardSelectorDataJemaat,
  Gap,
} from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";

const DataJemaat = () => {
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
      <Gap height={28} />
      <div className="card-selector">
        <p className="title">Tambah Data Jemaat</p>
        <hr />
        <div>
          <CardSelectorDataJemaat />
        </div>
      </div>
    </>
  );
};

export default DataJemaat;
