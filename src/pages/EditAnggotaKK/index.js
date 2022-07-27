import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import {
  NavBar,
  NavBarPelsus,
  CardSelectorDataKK,
  Gap,
  Button,
  Link,
} from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";
import { Delete } from "../../assets";
import firebase from "../../config/firebase";
import { useLocation } from "react-router-dom";
import "./editanggotakk.scss";

const EditAnggotaKK = ({ props }) => {
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
  const options = [{ value: "", label: "--Pilih Salah Satu Anggota--" }];

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

  const selectedAnggota = () => {
    const newOptions = [];
    loadDataKK.map((item) => {
      if (item.id === idKK.id) {
        newOptions.push({
          id: item.id,
          jenisKelamin: item.jenisKelamin,
          namaJemaat: item.namaJemaat,
          pekerjaan: item.pekerjaan,
          pendidikan: item.pendidikan,
          tempatLahir: item.tempatLahir,
          tanggalLahir: item.tanggalLahir,
          statusBaptis: item.statusBaptis,
          statusSidi: item.statusSidi,
          statusKawin: item.statusKawin,
        });
      }
    });
    console.log(loadDataKK);
    console.log("INI DATA NEW COPY FROM NEW OPTIONS", newOptions);

    firebase
      .database()
      .ref(`kkJemaat/${nomorKK}/anggotaKK`)
      .child(idKK.id)
      .set({
        newOptions,
      });
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
        <p className="title-box-input">Daftar Nama Jemaat Terdaftar</p>
        <div className="input-section-data-kk-jemaat">
          <Select
            defaultValue={options}
            options={newLoadData}
            onChange={setIDKK}
            onFocus={twoFunction}
          />
        </div>
        <Gap height={30} />
        <div className="input-section-button">
          <Button title="Simpan Data" onClick={selectedAnggota} />
        </div>
        <Gap height={30} />
        <hr />
        <table class="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th>No.</th>
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
            {copyUserData?.map((item,index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
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

export default EditAnggotaKK;
