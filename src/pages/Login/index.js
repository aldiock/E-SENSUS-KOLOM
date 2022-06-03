import React from "react";
import { LogoGMIM } from "../../assets";
import { Button, Gap, InputText } from "../../components";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <img src={LogoGMIM} alt="logogmim" className="logo-gmim" />
        <Gap width={20} />
        <div className="title-wrap">
          <Gap height={30} />
          <p className="text-login-header">E-SENSUS KOLOM 2</p>
          <hr />
          <p className="text-login-inner">GMIM GENESARET PATETEN</p>
        </div>
        <div className="form-login">
          <InputText placeholder="Masukkan email anda" />
          <Gap height={15}/>
          <InputText placeholder="Masukkan password anda" />
          <Gap height={24}/>
          <Button title="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
