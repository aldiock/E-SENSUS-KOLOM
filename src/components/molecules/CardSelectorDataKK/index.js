import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Gap, Link } from "../../atoms";
import "./cardselectordatakk.scss"

const CardSelectorDataKK = () => {
  const history = useHistory();

  return (
    <div className="wrapper-out">
      <div className="navbar-wrap-data-jemaat">
        <div className="tambah-user-data-jemaat">
          <Button
            title="Tambah KK"
            onClick={() => history.push("/add-data-kk-jemaat")}
          />
        </div>
        <Gap width={152} />
        <div className="lihat-data-jemaat">
          <Button
            title="Lihat Data"
            onClick={() => history.push("/data-kk-jemaat")}
          />
        </div>
        <Gap width={152} />
        <div className="refresh-data-jemaat">
          <Button title="Refresh Data" />
        </div>
        <Gap width={32} />
      </div>
    </div>
  );
};

export default CardSelectorDataKK;
