import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { LogoGMIM } from "../../assets";
import { Button, Gap, InputText } from "../../components";
import "./login.scss";
import firebase from "../../config/firebase";
import backEndDataContext from "../../contexts/backEndDataContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const backEndData = useContext(backEndDataContext);

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        firebase
          .database()
          .ref("users")
          .child(userCredential.user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              //get data
              const data = snapshot.val();
              const dataBaru = { ...data };
              console.log("DATA LOGIN", data);
              backEndData.setUserDetail({
                ...dataBaru,
                uid: userCredential.user.uid,
              });
              history.push("/dashboard");
            }
          });
      });
  };
  return (
    <div className="login">
      <div className="card">
        <img src={LogoGMIM} alt="logogmim" className="logo-gmim" />
        <Gap width={5} />
        <div className="title-wrap">
          <Gap height={30} />
          <p className="text-login-header">E-SENSUS KOLOM 2</p>
          <p className="text-login-inner">GMIM "GENESARET" PATETEN</p>
        </div>
        <div className="form-login">
          <InputText
            placeholder="Masukkan username anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Gap height={15} />
          <InputText
            placeholder="Masukkan password anda"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Gap height={24} />
          <Button title="Login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
