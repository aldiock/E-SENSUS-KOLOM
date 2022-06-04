import React,{useContext} from "react";
import { NavBar } from "../../components";
import backEndDataContext from "../../contexts/backEndDataContext";

const Dashboard = () => {

  const backEndData = useContext(backEndDataContext)

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>Dashboard Pages
      {console.log("BACKEND",backEndData.getUsersDetails.email)}
      </div>
    </>
  );
};

export default Dashboard;
