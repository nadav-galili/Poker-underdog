import React, { Component } from "react";

const Alert = ({ title, color, ...props }) => {
  return (
    <div className={`alert alert-${color} alert-dismissible`} role="alert">
      <span
        type="button"
        className="close"
        data-bs-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true" className="text-black">
          &times;
        </span>
      </span>
      <strong>{title}</strong>
      <span className="text-primary">
        <ol>
          {props.map((item) => {
            <li>{item}</li>;
          })}
        </ol>
      </span>
    </div>
  );
};

export default Alert;
