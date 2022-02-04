import React from "react";

const Footer = () => {
  return (
    <div
      className="d-flex flex-wrap justify-content-around align-items-center"
      id="footer"
    >
      <div className="logoImage ">
        <img src={process.env.PUBLIC_URL + "newIcon.jpeg"} alt="logo" />
      </div>
      <div className="copyrights ">
        <p className="w-100">
          Poker-Underdog was created by Nadav Galili &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <a href="https://www.nadav-galili.com">www.nadav-galili.com</a>
      </div>

      <div className="social-icons ">
        {/* <p className="mb-2">Contact me at:</p> */}
        <ul className="d-flex justify-content-around mt-4 p-0 ">
          <li>
            <a href="https://www.facebook.com/nadav.galili">
              <img
                src="https://img.icons8.com/doodle/50/000000/facebook-new.png"
                alt="facebook"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/nadavgalili">
              <img
                src="https://img.icons8.com/doodle/50/000000/twitter--v1.png"
                alt="twitter"
              />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/nadav-galili/">
              <img
                src="https://img.icons8.com/doodle/50/000000/linkedin--v2.png"
                alt="linkedin"
              />
            </a>
          </li>
          <li>
            <a href="https://github.com/nadav-galili">
              <img
                src="https://img.icons8.com/doodle/50/000000/github.png"
                alt="github"
              />
            </a>
          </li>

          <li>
            <a href="mailto:nadavg1000@gmail.com">
              <img
                src="https://img.icons8.com/plasticine/50/000000/email.png"
                alt="email"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
