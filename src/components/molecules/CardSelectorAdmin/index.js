import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Gap, Link } from "../../atoms";
import "./cardselector.scss";

const CardSelectorAdmin = () => {
  const history = useHistory();

  return (
   <div className="wrapper-out">
      <div className="navbar-wrap-admin">
      <div className="tambah-user">
        <Button
          title="Tambah User"
          onClick={() => history.push("/add-users")}
        />
      </div>
      <Gap width={152} />
      <div className="lihat-data">
        <Button title="Lihat Data"
        onClick={() => history.push("/admin")} />
      </div>
      <Gap width={152} />
      <div className="refresh">
        <Button title="Refresh Data" />
      </div>
      <Gap width={32} />
    </div>
   </div>
  );
};

export default CardSelectorAdmin;
