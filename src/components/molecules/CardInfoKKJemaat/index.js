import React, { useEffect, useState } from "react";
import firebase from "../../../config/firebase";
import "./cardinfokkjemaat.scss";

const CardInfoKKJemaat = () => {
  const [dataJemaat, setDataJemaat] = useState([]);
  const [dataLoadKK, setDataLoadKK] = useState([]);
  const [dataSD, setDataSD] = useState("");
  const [dataSMP, setDataSMP] = useState("");
  const [dataSMA, setDataSMA] = useState("");
  const [dataSMK, setDataSMK] = useState("");
  const [dataPT, setDataPT] = useState("");

  //function to count all dataLoadKK
  const countAll = () => {
    let count = 0;
    dataLoadKK.map((item) => {
      count++;
    });
    setDataLoadKK(count);
    return count;
  };

  //function to count dataJemaat.pendidikan === SD
  const countSD = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.pendidikan === "SD") {
        count++;
      }
    });
    setDataSD(count);
    return count;
  };
  //function to count dataJemaat.pendidikan === SMP
  const countSMP = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.pendidikan === "SMP") {
        count++;
      }
    });
    setDataSMP(count);
    return count;
  };
  //function to count dataJemaat.pendidikan === SMA
  const countSMA = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.pendidikan === "SMA") {
        count++;
      }
    });
    setDataSMA(count);
    return count;
  };

  //function to count dataJemaat.pendidikan === SMK
  const countSMK = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.pendidikan === "SMK") {
        count++;
      }
    });
    setDataSMK(count);
    return count;
  };

  //function to count dataJemaat.pendidikan === PT
  const countPT = () => {
    let count = 0;
    dataJemaat.map((item) => {
      if (item.pendidikan === "S1" || item.pendidikan === "D4") {
        count++;
      }
    });
    setDataPT(count);
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

    firebase
      .database()
      .ref("kkJemaat/")
      .on("value", (res) => {
        if (res.val()) {
          //convert to array
          const rawDataKK = res.val();
          const userJemaatKK = [];
          Object.keys(rawDataKK).map((item) => {
            userJemaatKK.push({
              id: item,
              ...rawDataKK[item],
            });
          });
          setDataLoadKK(userJemaatKK);
        }
      });
  }, []);

  useEffect(() => {
    countSD();
    countSMP();
    countSMA();
    countSMK();
    countPT();
  }, [dataJemaat]);

  return (
    <div className="wrapper-out">
      <div className="navbar-wrap-info-jemaat-dash">
        <p className="header-data-jemaat">Data KK Jemaat</p>
        <div className="data-jemaat-box">
          <p>Total ada {dataLoadKK.length} kartu keluarga jemaat.</p>
          <div className="line">
            <hr />
          </div>
          <p className="header-data-jemaat">Data Pendidikan Jemaat</p>
          <p>Total ada {dataSD} anggota jemaat pendidikan terakhir SD.</p>
          <p>Total ada {dataSMP} anggota jemaat pendidikan terakhir SMP.</p>
          <p>Total ada {dataSMA} anggota jemaat pendidikan terakhir SMA.</p>
          <p>Total ada {dataSMK} anggota jemaat pendidikan terakhir SMK.</p>
          <p>Total ada {dataPT} anggota jemaat pendidikan terakhir S1.</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfoKKJemaat;
