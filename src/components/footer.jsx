import React from "react";

const Footer = () => {
  return (
    <p className="text-center border-top pt-3">
      Poker-Underdog was created by Nadav Galili &copy;{" "}
      {new Date().getFullYear()}
    </p>
  );
};

export default Footer;
