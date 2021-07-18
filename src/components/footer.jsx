import React from "react";

const Footer = () => {
  return (
    <div className="container  ">
      <div className="d-flex justify-content-center row ">
        <div className="logomage col">
          <img
            src={process.env.PUBLIC_URL + "logoNewRed.png"}
            alt="logo"
            className="mt-4"
          />
        </div>

        <p className="col align-self-center ">
          Poker-Underdog was created by <br></br>Nadav Galili &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <div className="col social-icons mt-2 ">
          <p>Contact me at:</p>
          <ul>
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
    </div>
  );
};

export default Footer;
