import React from "react";
import { CardSelectorAdmin, NavBar, Gap } from "../../components";
import "./admin.scss";

const Admin = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <Gap height={28}/>
      <div className="card-selector">
        <p className="title">Data User</p>
        <hr />
        <div>
          <CardSelectorAdmin />
        </div>
        <div>Admin Pages</div>
      </div>
    </>
  );
};

export default Admin;
