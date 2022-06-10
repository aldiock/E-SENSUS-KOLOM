import React from "react";
import "./cardinfokkjemaat.scss";

const CardInfoKKJemaat = () => {
  return (
    <div className="wrapper-out">
      <div className="navbar-wrap-info-jemaat-dash">
        <p className="header-data-jemaat">Data KK Jemaat</p>
        <div className="data-jemaat-box">
          <p>Total ada 18 kartu keluarga jemaat.</p>
          <div className="line">
            <hr />
          </div>
          <p className="header-data-jemaat">Data Pendidikan Jemaat</p>
          <p>Total ada 16 anggota jemaat pendidikan terakhir SD.</p>
          <p>Total ada 16 anggota jemaat pendidikan terakhir SMP.</p>
          <p>Total ada 16 anggota jemaat pendidikan terakhir SMA.</p>
          <p>Total ada 16 anggota jemaat pendidikan terakhir SMK.</p>
          <p>Total ada 16 anggota jemaat pendidikan terakhir S1.</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfoKKJemaat;
