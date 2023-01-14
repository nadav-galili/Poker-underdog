import React, { Component } from "react";
import { SpinnerDotted } from "spinners-react";

const ClockSpinner = () => {
  return (
    <div className="spinner">
      <SpinnerDotted
        size={50}
        thickness={100}
        speed={100}
        color="rgba(0, 157, 255, 1)"
      />
    </div>
  );
};

export default ClockSpinner;
