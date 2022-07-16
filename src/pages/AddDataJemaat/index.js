import React, { useContext, useState, useEffect } from "react";
import {
  NavBar,
  NavBarPelsus,
  CardSelectorDataJemaat,
  Gap,
  Button,
  InputText,
} from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";
import "./adddatajemaat.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddDataJemaat = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavbarValid] = useState(true);
  const [startDate, setStartDate] = useState(null);

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
        <p className="title">Tambah Data Jemaat</p>
        <hr />
        <div>
          <CardSelectorDataJemaat />
        </div>
      </div>
      <Gap height={28} />
      <div className="form-section-add-jemaat">
        <p className="header-title">A. Data Pribadi</p>
        <p className="title-box-input">Nama Lengkap Jemaat</p>
        <div className="input-section">
          <InputText placeholder="Masukkan nama lengkap jemaat" />
        </div>
        <Gap height={10} />
        <p className="title-box-input">Jenis Kelamin</p>
        <div className="input-section">
          <select
            class="form-control selectpicker"
            name="jenis_kelamin"
            required
          >
            <option value="" selected disabled>
              - Pilih Jenis Kelamin -
            </option>
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <Gap height={10} />
        <p className="title-box-input">Tempat Lahir</p>
        <div className="input-section">
          <InputText placeholder="Masukkan tempat lahir" />
        </div>
        <Gap height={10} />
        <p className="title-box-input">Tanggal Lahir</p>
        <DatePicker
          className="input-section-date"
          placeholderText="Pilih tanggal lahir"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          withPortal
          portalId="root-portal"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <Gap height={10} />
        <Gap height={28} />
      </div>

      <div className="form-other">
        <p className="header-title">B. Data Lain-Lain</p>
        <p className="title-box-input">Status Perkawinan</p>
        <div className="input-section">
          <select
            class="form-control selectpicker"
            name="status_perkawinan"
            required
          >
            <option value="" selected disabled>
              - Pilih Status Perkawinan -
            </option>
            <option value="Sudah Menikah">Sudah Menikah</option>
            <option value="Belum Menikah">Belum Menikah</option>
            <option value="Cerai Mati">Cerai Mati</option>
            <option value="Cerai Hidup">Cerai Hidup</option>
          </select>
        </div>
        <Gap height={10} />
        <p className="title-box-input">Status Baptis</p>
        <div className="input-section">
          <select
            class="form-control selectpicker"
            name="status_baptis"
            required
          >
            <option value="" selected disabled>
              - Pilih Status Baptis -
            </option>
            <option value="Sudah Baptis">Sudah Baptis</option>
            <option value="Belum Baptis">Belum Baptis</option>
          </select>
        </div>
        <Gap height={10} />
        <p className="title-box-input">Status Sidi</p>
        <div className="input-section">
          <select class="form-control selectpicker" name="status_sidi" required>
            <option value="" selected disabled>
              - Pilih Status Sidi -
            </option>
            <option value="Sudah Sidi">Sudah Sidi</option>
            <option value="Belum Sidi">Belum Sidi</option>
          </select>
        </div>
        <Gap height={10} />
        <p className="title-box-input">Pekerjaan</p>
        <div className="input-section">
          <InputText placeholder="Masukkan pekerjaan" />
        </div>
        <div className="input-section-button">
          <Button title="Simpan Data" />
        </div>
      </div>
    </>
  );
};

export default AddDataJemaat;
