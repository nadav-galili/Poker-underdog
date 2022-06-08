import React, { useState } from "react";
import addNotification from "react-push-notification";

const Test = () => {
  const successNotification = () => {
    setTimeout(() => {
      addNotification({
        title: "Success",
        subtitle: "Test push",
        message: "Welcome to Poker underdog",
        theme: "light",
        closeButton: "X",
        backgroundTop: "green",
        native: true,
        icon: process.env.PUBLIC_URL + `logoNewRed.png`,
      });
    }, 3000);
  };
  return (
    <div className="container">
      <span> Test</span>;
      <button onClick={successNotification} className="btn btn-primary">
        subscribe
      </button>
    </div>
  );
};

export default Test;
