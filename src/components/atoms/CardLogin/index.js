import React from "react";
import { LogoGMIM } from "../../../assets";
import "./card.scss";

const CardLogin = () => {
  return (
    <div className="card">
      <img src={LogoGMIM} alt="logogmim" className="logo-gmim" />
      <p>E-SENSUS KOLOM 2</p>
      <p>GMIM GENESARET PATETEN</p>
    </div>
  );
};

export default CardLogin;
