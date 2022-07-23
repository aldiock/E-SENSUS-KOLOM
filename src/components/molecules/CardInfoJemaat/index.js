import React, { useEffect, useState } from "react";
import firebase from "../../../config/firebase";
import "./cardinfojemaat.scss";

const CardInfoJemaat = () => {
  const [dataJemaat, setDataJemaat] = useState([]);
  const [dataLakiLaki, setDataLakiLaki] = useState("");
  const [dataPerempuan, setDataPerempuan] = useState("");
  const [dataTotal, setDataTotal] = useState("");
  const [dataLansia, setDataLansia] = useState("");
  const [dataSidi, setDataSidi] = useState("");
  const [dataKawin, setDataKawin] = useState("");
  const [dataBelumKawin, setDataBelumKawin] = useState("");
  const [dataCeraiMati, setDataCeraiMati] = useState("");
  const [dataCeraiHidup, setDataCeraiHidup] = useState("");
  const [dataRemaja, setDataRemaja] = useState("");
  const [dataPemuda, setDataPemuda] = useState("");

  //function to count jemaat by gender LakiLaki
  const countJKL = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.jenisKelamin === "Laki-Laki") {
        count++;
      }
    });
    setDataLakiLaki(count);
    return count;
  };

  //function to count jemaat by genger Perempuan
  const countJKP = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.jenisKelamin === "Perempuan") {
        count++;
      }
    });
    setDataPerempuan(count);
    return count;
  };

  //function to count all jemaat
  const totalJemaat = () => {
    let count = 0;
    dataJemaat.map((item) => {
      count++;
    });
    setDataTotal(count);
    return count;
  };

  //function to count jemaat status sidi
  const countSidi = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.statusSidi === "Sudah Sidi") {
        count++;
      }
    });
    setDataSidi(count);
    return count;
  };

  //function to count jemaat status kawin === Belum Menikah
  const countKawin = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.statusKawin === "Belum Menikah") {
        count++;
      }
    });
    setDataBelumKawin(count);
    return count;
  };

  //function to count jemaat status kawin === Sudah Menikah
  const countKawinSudah = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.statusKawin === "Sudah Menikah") {
        count++;
      }
    });
    setDataKawin(count);
    return count;
  };

  //function to count jemaat status kawin === Cerai Mati
  const countCeraiMati = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.statusKawin === "Cerai Mati") {
        count++;
      }
    });
    setDataCeraiMati(count);
    return count;
  };

  //function to count jemaat status kawin === Cerai Hidup
  const countCeraiHidup = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.statusKawin === "Cerai Hidup") {
        count++;
      }
    });
    setDataCeraiHidup(count);
    return count;
  };

  // function to calculate how many jemaat more than 60 years old from dataJemaat.tanggalLahir
  const countLansia = () => {
    let count = 0;
    dataJemaat.map((item) => {
      let tanggalLahir = new Date(item.tanggalLahir);
      let now = new Date();
      let age = now.getFullYear() - tanggalLahir.getFullYear();
      if (age > 60) {
        count++;
      }
    });
    setDataLansia(count);
    return count;
  };

  const countRemaja = () => {
    let count = 0;
    dataJemaat.map((item) => {
      let tanggalLahir = new Date(item.tanggalLahir);
      let now = new Date();
      let age = now.getFullYear() - tanggalLahir.getFullYear();
      if (age < 17) {
        count++;
      }
    });
    setDataRemaja(count);
    return count;
  };

  const countPemuda = () => {
    let count = 0;
    dataJemaat.map((item) => {
      let tanggalLahir = new Date(item.tanggalLahir);
      let now = new Date();
      let age = now.getFullYear() - tanggalLahir.getFullYear();
      if (age > 17) {
        count++;
      }
    });
    setDataPemuda(count);
    return count;
  };

  useEffect(() => {
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
    countRemaja();
    countPemuda();
    countLansia();
    countJKL();
    countJKP();
    countSidi();
    countCeraiHidup();
    countCeraiMati();
    countKawin();
    countKawinSudah();
    totalJemaat();
  }, []);

  //made useEffect to trigger when dataJemaat is changed
  useEffect(() => {
    countRemaja();
    countPemuda();
    countLansia();
    countJKL();
    countJKP();
    countSidi();
    countCeraiHidup();
    countCeraiMati();
    countKawin();
    countKawinSudah();
    totalJemaat();
  }, [dataJemaat]);

  return (
    <>
      <div className="wrapper-out">
        <div className="navbar-wrap-info-jemaat">
          <p className="header-data-jemaat">Data Jemaat</p>

          <div className="data-jemaat-box">
            <p>
              Total ada {dataTotal} data anggota jemaat, {dataLakiLaki}{" "}
              diantaranya laki-laki dan {dataPerempuan} diantaranya perempuan.
            </p>
            <p>Anggota jemaat diatas 60 tahun berjumlah {dataLansia} orang.</p>
            <p>Anggota jemaat diatas 17 tahun berjumlah {dataPemuda} orang.</p>
            <p>Anggota jemaat dibawah 17 tahun berjumlah {dataRemaja} orang.</p>
            <p>
              Anggota yang sudah berstatus sidi jemaat berjumlah {dataSidi}{" "}
              orang.
            </p>
            <div className="line">
              <hr />
            </div>
            <p className="header-data-jemaat">Status Perkawinan Jemaat</p>
            <p>Total ada {dataBelumKawin} anggota jemaat belum menikah.</p>
            <p>Total ada {dataKawin} anggota jemaat yang sudah menikah.</p>
            <p>Total ada {dataCeraiHidup} anggota jemaat cerai hidup.</p>
            <p>Total ada {dataCeraiMati} anggota jemaat cerai mati.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfoJemaat;
