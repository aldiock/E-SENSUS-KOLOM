import React, { useState, useEffect } from "react";
import {
  CardSelectorAdmin,
  NavBar,
  Gap,
  InputText,
  Button,
} from "../../components";
import "./updateuser.scss";
import { useLocation } from "react-router-dom";
import firebase from "../../config/firebase";

const UpdateUser = (props) => {
  const location = useLocation();
  const myParam = location.state.params;
  const idUpdate = myParam.id;

  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState([]);

  function handleSelectedStatus(event) {
    setStatus(event.target.value);
  }

  useEffect(() => {
    setNamaLengkap(myParam.namaLengkap);
    setEmail(myParam.email);
    setStatus([myParam.status]);
  });

  const handleSubmit = () => {
    // //save to firebase
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const userId = userCredential.user.uid;
    //     firebase
    //       .database()
    //       .ref("users/" + userId)
    //       .set(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //update data
    firebase.database().ref("users").child(idUpdate).update({
      email: email,
      namaLengkap: namaLengkap,
      status: status,
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
        <p className="title">Edit Data User</p>
        <hr />
        <Gap height={28} />
        <div className="form-section">
          <p className="header-title">A. Data Pribadi</p>
          <p>Nama Lengkap User</p>
          <div className="input-section">
            <InputText
              placeholder="Masukkan nama lengkap user"
              defaultValue={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
            />
          </div>
          <Gap height={10} />
          <p>Email User</p>
          <div className="input-section">
            <InputText
              placeholder="Masukkan email user"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Gap height={10} />
          <p>Status</p>
          <div className="input-section">
            <select
              class="form-control selectpicker"
              name="status_user"
              defaultValue={status}
              onChange={handleSelectedStatus}
            >
              <option value="" selected disabled>
                {status}
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

export default UpdateUser;
