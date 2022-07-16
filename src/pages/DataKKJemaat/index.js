import React, { useContext, useEffect, useState } from "react";
import {
  CardSelectorDataKK,
  Gap,
  NavBar,
  NavBarPelsus,
} from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";

const DataKKJemaat = () => {
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
        <p className="title">Tambah Data KK Jemaat</p>
        <hr />
        <div>
          <CardSelectorDataKK />
        </div>
      </div>
    </>
  );
};

export default DataKKJemaat;
