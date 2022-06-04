import React, { useState, useEffect } from "react";
import { CardSelectorAdmin, Gap, Link, NavBar } from "../../components";
import "./lihatdata.scss";
import firebase from "../../config/firebase";
import { Delete, Edit } from "../../assets";

const LihatData = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("users")
      .on("value", (res) => {
        if (res.val()) {
          //insert data to Array
          const rawData = res.val();
          const userArr = [];
          Object.keys(rawData).map((item) => {
            userArr.push({
              id: item,
              ...rawData[item],
            });
          });
          setDataUsers(userArr);
        }
      });
  }, []);

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
        <table class="table table-striped table-condensed table-hover">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Status</th>
              <div className="action-style">
                <th>Action</th>
              </div>
            </tr>
          </thead>
          <tbody>
            {dataUsers.map((item) => (
              <tr key={item.id}>
                <td>{item.namaLengkap}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
                <td>
                  <div className="button-action">
                    <div className="edit-logo">
                      <img src={Edit} alt="edit" className="logo-edit" />
                      <Link title="Edit" />
                    </div>
                    <Gap width={10} />
                    <div className="delete-logo">
                      <img src={Delete} alt="delete" className="logo-delete" />
                      <Link title="Hapus" />
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

export default LihatData;
