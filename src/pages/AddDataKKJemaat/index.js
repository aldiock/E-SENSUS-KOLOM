import React, { useContext, useEffect, useState } from "react";
import {
  NavBar,
  NavBarPelsus,
  CardSelectorDataKK,
  Gap,
  Button,
  InputText,
} from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";
import "./adddatakkjemaat.scss";

const AddDataKKJemaat = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavBarValid] = useState(true);

  useEffect(() => {
    if (backEndData.getUserDetails().status === "Admin") {
      setNavBarValid(false);
    } else {
      setNavBarValid(true);
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
      <Gap height={28} />
      <div className="form-section-add-data-kk-jemaat">
        <p className="header-title">A. Data Pribadi</p>
        <p className="title-box-input">No. Kartu Keluarga</p>
        <div className="input-section-data-kk-jemaat">
          <InputText placeholder="Masukkan nomor kartu keluarga" />
        </div>
        <Gap height={10} />
      </div>
    </>
  );
};

export default AddDataKKJemaat;
