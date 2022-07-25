import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { HashLoader } from "react-spinners";
import { LogoGMIM } from "../../assets";
import { Button, Gap, InputText } from "../../components";
import firebase from "../../config/firebase";
import backEndDataContext from "../../contexts/backEndDataContext";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const backEndData = useContext(backEndDataContext);

  //loading state
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
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
        setLoading(false);
      });
  };
  return (
    <>
      <div className="login">
        <div className="card">
          <img src={LogoGMIM} alt="logogmim" className="logo-gmim" />
          <Gap width={5} />
          <div className="title-wrap">
            <Gap height={30} />
            <p className="text-login-header">E-SENSUS KOLOM 2</p>
            <p className="text-login-inner">GMIM "GENESARET" </p>
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
            <div className="loading">
              {loading && (
                <HashLoader color={"B1B4B3"} loading={loading} size={90} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
