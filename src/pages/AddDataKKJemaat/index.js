import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import {
  NavBar,
  NavBarPelsus,
  CardSelectorDataKK,
  Gap,
  Button,
  InputText,
} from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";
import firebase from "../../config/firebase";
import "./adddatakkjemaat.scss";

const AddDataKKJemaat = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavBarValid] = useState(true);
  const [loadDataKK, setLoadDataKK] = useState([{}]);
  const [newLoadData, setNewLoadData] = useState([{}]);
  const [validLoad, setValidLoad] = useState(true);
  const [idKK, setIDKK] = useState(null);
  const [noKK, setNoKK] = useState("");

  //submit
  const handleSubmit = () => {
    const data = {
      idKK: idKK,
      noKK: noKK,
    };
    console.log("INI DATA", data.idKK);
    firebase.database().ref('kkJemaat').child(idKK.id).set(data);
    setIDKK(options);
    setNoKK("");
  };

  //dummy options default for drop down
  const options = [
    { value: "", label: "--Pilih ID Salah Satu Kepala Keluarga--" },
  ];

  //function to convert loadDataKK to new array structure
  const convertDataKKToOptions = () => {
    const newOptions = [];
    loadDataKK.map((item) => {
      newOptions.push({
        id: item.id,
        value: item.namaJemaat,
        label: item.namaJemaat + " || ID KK : " + item.id,
      });
    });
    setNewLoadData(newOptions);
    return newOptions;
  };

  //function load
  const loadData = () => {
    firebase
      .database()
      .ref("jemaat/")
      .on("value", (res) => {
        if (res.val()) {
          //convert to array
          const rawData = res.val();
          const userKK = [];
          Object.keys(rawData).map((item) => {
            userKK.push({
              id: item,
              ...rawData[item],
            });
          });
          setLoadDataKK(userKK);
        }
      });
  };

  const twoFunction = () => {
    loadData();
    convertDataKKToOptions();
  };

  //trigger and validate status users login
  useEffect(() => {
    if (backEndData.getUserDetails().status === "Admin") {
      setNavBarValid(false);
    } else {
      setNavBarValid(true);
    }
    loadData();
  }, []);

  //triger for load data in dropdown
  useEffect(() => {
    if (validLoad) {
      setValidLoad(false);
      twoFunction();
    } else {
      setValidLoad(true);
      twoFunction();
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
          <InputText
            placeholder="Masukkan nomor kartu keluarga"
            value={noKK}
            onChange={(e) => setNoKK(e.target.value)}
          />
        </div>
        <Gap height={10} />
        <p className="title-box-input">ID Kepala Keluarga</p>
        <div className="input-section-data-kk-jemaat">
          <Select
            defaultValue={options}
            options={newLoadData}
            onChange={setIDKK}
            onFocus={twoFunction}
          />
        </div>
        <Gap height={10} />
        <div className="input-section-button">
          <Button title="Simpan Data" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default AddDataKKJemaat;
