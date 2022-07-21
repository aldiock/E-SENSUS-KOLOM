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
import firebase from "../../config/firebase";

const AddDataJemaat = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavbarValid] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [namaJemaat, setNamaJemaat] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState([]);
  const [tempatLahir, setTempatLahir] = useState("");
  const [pendidikan, setPendidikan] = useState([]);
  const [statusKawin, setStatusKawin] = useState([]);
  const [statusBaptis, setStatusBaptis] = useState([]);
  const [statusSidi, setStatusSidi] = useState([]);
  const [pekerjaan, setStatusPekerjaan] = useState("");


  useEffect(() => {
    if (backEndData.getUserDetails().status === "Admin") {
      setNavbarValid(false);
    } else {
      setNavbarValid(true);
    }
  }, []);

  const handleSubmit = () => {

    const toStringDate = startDate.toDateString();

    const data = {
      namaJemaat: namaJemaat,
      jenisKelamin: jenisKelamin,
      tempatLahir: tempatLahir,
      pendidikan: pendidikan,
      statusKawin: statusKawin,
      statusBaptis: statusBaptis,
      statusSidi: statusSidi,
      pekerjaan: pekerjaan,
      tanggalLahir: toStringDate,
    };
    console.log(data);

    firebase.database().ref("jemaat/").push(data);
    setNamaJemaat("");
    setJenisKelamin([]);
    setTempatLahir("");
    setPendidikan([]);
    setStatusKawin([]);
    setStatusBaptis([]);
    setStatusSidi([]);
    setStatusPekerjaan("");
    setStartDate(null);
  };

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
          <InputText
            placeholder="Masukkan nama lengkap jemaat"
            value={namaJemaat}
            onChange={(e) => setNamaJemaat(e.target.value)}
          />
        </div>
        <Gap height={10} />
        <p className="title-box-input">Jenis Kelamin</p>
        <div className="input-section">
          <select
            class="form-control selectpicker"
            name="jenis_kelamin"
            required
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
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
          <InputText
            placeholder="Masukkan tempat lahir"
            value={tempatLahir}
            onChange={(e) => setTempatLahir(e.target.value)}
          />
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
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <Gap height={10} />
        <p className="title-box-input">Pendidikan Terakhir</p>
        <div className="input-section">
          <select
            class="form-control selectpicker"
            name="status_pendidikan"
            required
            value={pendidikan}
            onChange={(e) => setPendidikan(e.target.value)}
          >
            <option value="" selected disabled>
              - Pilih Pendidikan Terakhir -
            </option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="SMK">SMK</option>
            <option value="D1">D1</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
            <option value="D4">D4</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
        </div>
      </div>

      <div className="form-other">
        <p className="header-title">B. Data Lain-Lain</p>
        <p className="title-box-input">Status Perkawinan</p>
        <div className="input-section">
          <select
            class="form-control selectpicker"
            name="status_perkawinan"
            required
            value={statusKawin}
            onChange={(e) => setStatusKawin(e.target.value)}
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
            value={statusBaptis}
            onChange={(e) => setStatusBaptis(e.target.value)}
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
          <select
            class="form-control selectpicker"
            name="status_sidi"
            required
            value={statusSidi}
            onChange={(e) => setStatusSidi(e.target.value)}
          >
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
          <InputText
            placeholder="Masukkan pekerjaan"
            value={pekerjaan}
            onChange={(e) => setStatusPekerjaan(e.target.value)}
          />
        </div>
        <div className="input-section-button">
          <Button title="Simpan Data" onClick={handleSubmit} />
        </div>
        <Gap height={20} />
      </div>
    </>
  );
};

export default AddDataJemaat;
