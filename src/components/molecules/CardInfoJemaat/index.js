import React from "react";
import { useHistory } from "react-router-dom";
import "./cardinfojemaat.scss";

const CardInfoJemaat = () => {

  return (
    <div className="wrapper-out">
      <div className="navbar-wrap-info-jemaat">
        <p className="header-data-jemaat">Data Jemaat</p>
        <div className="data-jemaat-box">
          <p>
            Total ada 65 data anggota jemaat, 32 diantaranya laki-laki dan 33
            diantaranya perempuan.
          </p>
          <p>
            Anggota jemaat diatas 17 tahun berjumlah 52 orang dan dibawah 17
            tahun berjumlah 13 orang.
          </p>
          <p>Anggota jemaat diatas 60 tahun berjumlah 10 orang.</p>
          <p>Anggota yang sudah berstatus sidi jemaat berjumlah 48 orang.</p>
          <div className="line">
            <hr />
          </div>
          <p className="header-data-jemaat">Status Perkawinan Jemaat</p>
          <p>Total ada 32 anggota jemaat belum menikah.</p>
          <p>Total ada 30 anggota jemaat yang sudah menikah.</p>
          <p>Total ada 3 anggota jemaat cerai hidup.</p>
          <p>Total ada 0 anggota jemaat cerai mati.</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfoJemaat;
