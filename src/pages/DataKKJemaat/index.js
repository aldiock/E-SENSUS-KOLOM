import React, { useContext, useEffect, useState } from "react";
import {
  CardSelectorDataKK,
  Gap,
  NavBar,
  NavBarPelsus,
  Link,
} from "../../components";
import { Delete } from "../../assets";
import { useHistory } from "react-router";
import backEndDataContext from "../../contexts/backEndDataContext";
import firebase from "../../config/firebase";

const DataKKJemaat = () => {
  const backEndData = useContext(backEndDataContext);
  const [navbarValid, setNavbarValid] = useState(true);
  const [dataKKJemaat, setDataKKJemaat] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (backEndData.getUserDetails().status === "Admin") {
      setNavbarValid(false);
    } else {
      setNavbarValid(true);
    }

    firebase
      .database()
      .ref("kkJemaat/")
      .on("value", (res) => {
        if (res.val()) {
          //convert to array
          const rawData = res.val();
          const userKKJemaat = [];
          Object.keys(rawData).map((item) => {
            userKKJemaat.push({
              id: item,
              ...rawData[item],
            });
          });
          setDataKKJemaat(userKKJemaat);
        }
      });
  }, []);

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
        <p className="title">Data KK Jemaat</p>
        <hr />
        <div>
          <CardSelectorDataKK />
        </div>
        <table class="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th>ID KK from Database</th>
              <th>No. Kepala Keluarga</th>
              <th>Nama Kepala Keluarga</th>
              <div className="action-style">
                <th>Action</th>
              </div>
            </tr>
          </thead>
          <tbody>
            {dataKKJemaat.map((item) => (
              <tr key={item.idKK.id}>
                <td>{item.idKK.id}</td>
                <td>{item.noKK}</td>
                <td>{item.idKK.value}</td>
                <td>
                  <div className="button-action">
                    <div className="delete-logo">
                      <img src={Delete} alt="delete" className="logo-delete" />
                      <Link
                        title="Edit Anggota Keluarga"
                        onClick={() =>
                          history.push("/add-anggota-kk-jemaat", { item })
                        }
                      />
                    </div>
                  </div>
                  <div className="button-action">
                    <div className="delete-logo">
                      <img src={Delete} alt="delete" className="logo-delete" />
                      <Link
                        title="Lihat Data Anggota Keluarga"
                        onClick={() =>
                          history.push("/view-anggota-kk-jemaat", { item })
                        }
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataKKJemaat;
