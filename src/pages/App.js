import React, { useState } from "react";
import { Routes } from "../config";
import "./App.css";
import { BackendDataProvider } from "../contexts/backEndDataContext";

const App = () => {
  const [backEndData, setBackEndData] = useState();

  //users login data
  const setUserDetail = (data) => {
    setBackEndData((prevState) => ({ ...prevState, userData: data }));
  };

  const getUserDetails = () => {
    return backEndData.userData;
  };

  return (
    <>
      <BackendDataProvider
        value={{
          data: backEndData,
          setUserDetail: setUserDetail,
          getUserDetails: getUserDetails,
        }}
      >
        <Routes />
      </BackendDataProvider>
    </>
  );
};

export default App;
