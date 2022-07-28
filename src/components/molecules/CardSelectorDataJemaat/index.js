import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Gap, Link } from "../../atoms";
import "./cardselectorjemaat.scss";

const CardSelectorDataJemaat = () => {
  const history = useHistory();

  return (
    <div className="wrapper-out">
      <div className="navbar-wrap-data-jemaat">
        <div className="tambah-user-data-jemaat">
          <Button
            title="Tambah Data"
            onClick={() => history.push("/add-data-jemaat")}
          />
        </div>
        <Gap width={152} />
        <div className="lihat-data-jemaat">
          <Button
            title="Lihat Data"
            onClick={() => history.push("/data-jemaat")}
          />
        </div>
        <Gap width={152} />
        <div className="refresh-data-jemaat">
          <Button title="Refresh Data"  />
        </div>
        <Gap width={32} />
      </div>
    </div>
  );
};

export default CardSelectorDataJemaat;
