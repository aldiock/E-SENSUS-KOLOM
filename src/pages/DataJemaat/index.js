import React, { useContext, useEffect, useState } from "react";
import {
  NavBar,
  NavBarPelsus,
  CardSelectorDataJemaat,
  Gap,
  Link,
} from "../../components";
import { Delete } from "../../assets";
import backEndDataContext from "../../contexts/backEndDataContext";
import firebase from "../../config/firebase";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import "./datajemaat.scss";

const DataJemaat = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavbarValid] = useState(true);
  const [dataJemaat, setDataJemaat] = useState([]);

  useEffect(() => {
    if (backEndData.getUserDetails().status === "Admin") {
      setNavbarValid(false);
    } else {
      setNavbarValid(true);
    }

    firebase
      .database()
      .ref("jemaat/")
      .on("value", (res) => {
        if (res.val()) {
          //convert to array
          const rawData = res.val();
          const userJemaat = [];
          Object.keys(rawData).map((item) => {
            userJemaat.push({
              id: item,
              ...rawData[item],
            });
          });
          setDataJemaat(userJemaat);
        }
      });
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
        <p className="title">Data Jemaat</p>
        <hr />
        <div>
          <CardSelectorDataJemaat />
        </div>
        <Gap height={10} />

        <div className="csv-print">
          <ReactHtmlTableToExcel
            className="csv-style"
            table="data-jemaat-table"
            filename="Data Jemaat Kolom 2"
            sheet="Sheet"
            buttonText="CSV Export"
          />
        </div>
        <table
          class="table table-striped table-condensed table-hover"
          id="data-jemaat-table"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Jemaat</th>
              <th>Jenis Kelamin</th>
              <th>Tempat Lahir</th>
              <th>Tanggal Lahir</th>
              <th>Pekerjaan</th>
              <th>Pendidikan Terakhir</th>
              <th>Status Kawin</th>
              <th>Status Baptis</th>
              <th>Status Sidi</th>
            </tr>
          </thead>
          <tbody>
            {dataJemaat.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.namaJemaat}</td>
                <td>{item.jenisKelamin}</td>
                <td>{item.tempatLahir}</td>
                <td>{item.tanggalLahir}</td>
                <td>{item.pekerjaan}</td>
                <td>{item.pendidikan}</td>
                <td>{item.statusKawin}</td>
                <td>{item.statusBaptis}</td>
                <td>{item.statusSidi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataJemaat;
