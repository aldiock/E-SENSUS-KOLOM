import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Delete } from "../../assets";
import {
  CardSelectorDataKK,
  Gap,
  Link,
  NavBar,
  NavBarPelsus,
} from "../../components";
import firebase from "../../config/firebase";
import backEndDataContext from "../../contexts/backEndDataContext";

const ViewAnggotaKK = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavBarValid] = useState(true);
  const [loadDataKK, setLoadDataKK] = useState([{}]);
  const [newLoadData, setNewLoadData] = useState([{}]);
  const [validLoad, setValidLoad] = useState(true);
  const [validSelected, setValidSelected] = useState(true);
  const [idKK, setIDKK] = useState(null);
  const [noKK, setNoKK] = useState("");
  const { state } = useLocation();
  const nomorKK = state.item.idKK.id;
  const namaKepalaKeluarga = state.item.idKK.value;

  const [copyUserData, setCopyUserData] = useState([
    { newOptions: [{ 0: [{}] }] },
  ]);

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

  const loadDataRegisterKK = () => {
    firebase
      .database()
      .ref(`kkJemaat/${nomorKK}/anggotaKK`)
      .on("value", (res) => {
        if (res.val()) {
          //convert to array
          const rawData = res.val();
          const userKKRegis = [];
          Object.keys(rawData).map((item) => {
            userKKRegis.push({
              id: item,
              ...rawData[item],
            });
          });
          setCopyUserData(userKKRegis);
        }
      });
  };

  const twoFunction = () => {
    loadData();
    convertDataKKToOptions();
    loadDataRegisterKK();
  };

  useEffect(() => {
    if (backEndData.getUserDetails().status === "Admin") {
      setNavBarValid(false);
    } else {
      setNavBarValid(true);
    }
    loadData();
    console.log(copyUserData);
  }, []);

  useEffect(() => {
    if (validLoad) {
      setValidLoad(false);
      twoFunction();
      loadDataRegisterKK();
    } else {
      setValidLoad(true);
      twoFunction();
      loadDataRegisterKK();
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
        <p className="title">Data Kartu Keluarga</p>
        <hr />
        <div>
          <CardSelectorDataKK />
        </div>
      </div>
      <Gap height={28} />
      <div className="form-section-add-data-kk-jemaat">
        <table class="table table-striped table-condensed table-hover">
          <tbody>
            <tr>
              <th width="20%">ID Kepala Keluarga On Database</th>
              <td width="1%">:</td>
              <td className="title-box-input-nama">{nomorKK}</td>
            </tr>
            <tr>
              <th width="20%">Nama Kepala Keluarga</th>
              <td width="1%">:</td>
              <td className="title-box-input-nama">{namaKepalaKeluarga}</td>
            </tr>
          </tbody>
        </table>
        <Gap height={10} />
        <hr />
        <table class="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th>Nama Jemaat</th>
              <th>Jenis Kelamin</th>
              <th>Tempat Lahir</th>
              <th>Tanggal Lahir</th>
              <th>Pekerjaan</th>
              <th>Pendidikan Terakhir</th>
              <th>Status Kawin</th>
              <th>Status Baptis</th>
              <th>Status Sidi</th>
              <div className="action-style">
                <th>Action</th>
              </div>
            </tr>
          </thead>
          <tbody>
            {copyUserData?.map((item) => (
              <tr key={item.id}>
                <td>{item?.newOptions[0].namaJemaat}</td>
                <td>{item.newOptions[0].jenisKelamin}</td>
                <td>{item.newOptions[0].tempatLahir}</td>
                <td>{item.newOptions[0].tanggalLahir}</td>
                <td>{item.newOptions[0].pekerjaan}</td>
                <td>{item.newOptions[0].pendidikan}</td>
                <td>{item.newOptions[0].statusKawin}</td>
                <td>{item.newOptions[0].statusBaptis}</td>
                <td>{item.newOptions[0].statusSidi}</td>
                <td>
                  <div className="button-action">
                    <div className="delete-logo">
                      <img src={Delete} alt="delete" className="logo-delete" />
                      <Link title="Hapus User" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewAnggotaKK;
