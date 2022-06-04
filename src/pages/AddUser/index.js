import React, { useState } from "react";
import {
  CardSelectorAdmin,
  NavBar,
  Gap,
  InputText,
  Button,
} from "../../components";
import "./adduser.scss";
import { useHistory } from "react-router-dom";
import firebase from "../../config/firebase";

const AddUser = (props) => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState([]);

  function handleSelectedStatus(event) {
    setStatus(event.target.value);
  }

  const handleSubmit = () => {
    const data = {
      namaLengkap: namaLengkap,
      email: email,
      status: status,
    };

    //save to firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        firebase
          .database()
          .ref("users/" + userId)
          .set(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setNamaLengkap("");
    setEmail("");
    setPassword("");
    setStatus([]);
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <Gap height={28} />
      <div className="card-selector">
        <p className="title">Data User</p>
        <hr />
        <div>
          <CardSelectorAdmin />
        </div>
        <Gap height={28} />
        <div className="form-section">
          <p className="header-title">A. Data Pribadi</p>
          <p>Nama Lengkap User</p>
          <div className="input-section">
            <InputText
              placeholder="Masukkan nama lengkap user"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
            />
          </div>
          <Gap height={10} />
          <p>Email User</p>
          <div className="input-section">
            <InputText
              placeholder="Masukkan email user"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Gap height={10} />
          <p>Password</p>
          <div className="input-section">
            <InputText
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Gap height={10} />
          <p>Status</p>
          <div className="input-section">
            <select
              class="form-control selectpicker"
              name="status_user"
              required
              value={status}
              onChange={handleSelectedStatus}
            >
              <option value="" selected disabled>
                - Pilih Hak Akses User -
              </option>
              <option value="Admin">Admin</option>
              <option value="Pelsus">Pelsus</option>
            </select>
          </div>
          <Gap height={28} />
          <div className="input-section-button">
            <Button title="Simpan Data" onClick={handleSubmit} />
          </div>
          <Gap height={28} />
        </div>
      </div>
    </>
  );
};

export default AddUser;
